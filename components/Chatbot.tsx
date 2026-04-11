"use client";

import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const predefinedQuestions = [
  "What services does Dzignex offer?",
  "How can I contact Dzignex?",
  "What is Dzignex's experience?",
  "Can you show me some projects?",
];

const answers = {
  "What services does Dzignex offer?": "Dzignex Studio offers web development, UI/UX design, mobile app development, and digital marketing services.",
  "How can I contact Dzignex?": "You can contact us through our contact page or email us at info@dzignex.com.",
  "What is Dzignex's experience?": "With over 5 years of experience, Dzignex has worked with various clients across industries.",
  "Can you show me some projects?": "Sure! Check out our projects page to see some of our recent work.",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleQuestionClick = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
    };
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: answers[question as keyof typeof answers] || "I'm sorry, I don't have an answer for that yet.",
      isUser: false,
    };
    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: input,
        isUser: true,
      };
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your question! Our team will get back to you soon.",
        isUser: false,
      };
      setMessages((prev) => [...prev, userMessage, botMessage]);
      setInput("");
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div className="fixed bottom-4 right-8 2xl:right-16 z-50 flex flex-col items-end">
          <div className="mb-2 px-3 py-1 bg-dzignex-blue text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
            Hey, how can I help you?
          </div>
          <SheetTrigger asChild>
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for gravity-like motion
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Button
                size="lg"
                className="rounded-full bg-dzignex-blue hover:bg-dzignex-blue/80 text-white shadow-lg"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
            </motion.div>
          </SheetTrigger>
        </div>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Dzignex Chatbot</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500">
                  <p>Hi! I'm here to help you learn more about Dzignex. Ask me anything or click on a question below.</p>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="space-y-2 mb-4">
                {predefinedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start"
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}