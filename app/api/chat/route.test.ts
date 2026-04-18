// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const chatMocks = vi.hoisted(() => {
  const sendMessage = vi.fn();
  const startChat = vi.fn(() => ({ sendMessage }));
  const getGenerativeModel = vi.fn(() => ({ startChat }));
  function GoogleGenerativeAI() {
    return { getGenerativeModel };
  }

  return {
    sendMessage,
    startChat,
    getGenerativeModel,
    GoogleGenerativeAI,
  };
});

vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: chatMocks.GoogleGenerativeAI,
}));

import { POST } from "./route";

describe("POST /api/chat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when no messages are provided", async () => {
    const req = {
      json: vi.fn().mockResolvedValue({ messages: [] }),
    } as any;

    const res = await POST(req);

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: "No messages provided" });
  });

  it("returns assistant response and forwards safe history", async () => {
    chatMocks.sendMessage.mockResolvedValue({
      response: { text: () => "Hello from Dex" },
    });

    const messages = [
      { role: "system", content: "ignore" },
      { role: "user", content: "Hi" },
      { role: "assistant", content: "previous answer" },
      { role: "user", content: "I need a landing page" },
    ];

    const req = {
      json: vi.fn().mockResolvedValue({ messages }),
    } as any;

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual({
      message: { role: "assistant", content: "Hello from Dex" },
    });

    expect(chatMocks.getGenerativeModel).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "gemini-2.5-flash",
      })
    );
    expect(chatMocks.startChat).toHaveBeenCalledWith({
      history: [
        { role: "user", parts: [{ text: "Hi" }] },
        { role: "model", parts: [{ text: "previous answer" }] },
      ],
    });
    expect(chatMocks.sendMessage).toHaveBeenCalledWith("I need a landing page");
  });

  it("returns 500 when provider throws", async () => {
    chatMocks.sendMessage.mockRejectedValue(new Error("provider error"));

    const req = {
      json: vi.fn().mockResolvedValue({
        messages: [{ role: "user", content: "hello" }],
      }),
    } as any;

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body).toEqual({
      error: "Something went wrong",
      details: "provider error",
    });
  });
});
