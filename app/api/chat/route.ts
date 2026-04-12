// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are the support assistant for Dzignex Studio, a premium design and development agency.

About Dzignex Studio:
- We offer web development, UI/UX design, mobile app development, and digital marketing services
- We have over 5 years of experience working with various clients across industries
- Contact us through the contact page or email info@dzignex.com
- Check our projects page to see our recent work

Be helpful, professional, and concise. Answer questions about our services, process, and how to work with us.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    

    if (!messages?.length) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }
    // Add this right after the messages check
    console.log("API KEY present:", !!process.env.GEMINI_API_KEY);
    console.log("Messages received:", JSON.stringify(messages, null, 2));

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const allButLast = messages.slice(0, -1);
    const firstUserIdx = allButLast.findIndex((m: any) => m.role === "user");
    const safeHistory = firstUserIdx === -1 ? [] : allButLast.slice(firstUserIdx);
    const history = safeHistory.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1].content;

    const result = await chat.sendMessage(lastMessage);
    const text = result.response.text();

    return NextResponse.json({ message: { role: "assistant", content: text } });
  } catch (err: any) {
    console.error("Chat API error:", err);
    console.error("Error details:", err.message || "Unknown error");
    return NextResponse.json(
      { error: "Something went wrong", details: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}