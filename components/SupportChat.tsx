"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Dex, { type DexState } from "./Dex";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "I'm Dex, from Dzignex Studio. Tell me about the brand you're building — or ask me anything.",
};

// One-tap conversation starters, shown only before the first user message.
const STARTERS = [
  "How does pricing work?",
  "What's your process?",
  "Can you help with packaging?",
] as const;

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [greetingActive, setGreetingActive] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [justReplied, setJustReplied] = useState(false);

  // Dex's expression, derived from what the chat is doing right now.
  const dexState: DexState = isOpen
    ? isTyping
      ? "thinking"
      : justReplied
        ? "happy"
        : "listening"
    : greetingActive
      ? "greeting"
      : "idle";

  // A few seconds after load, if the visitor hasn't opened the chat, Dex peeks
  // out once with a one-line nudge.
  useEffect(() => {
    if (hasGreeted || isOpen) return;
    const t = setTimeout(() => {
      setHasGreeted(true);
      setGreetingActive(true);
      setShowBubble(true);
      setTimeout(() => setGreetingActive(false), 1000);
    }, 3200);
    return () => clearTimeout(t);
  }, [hasGreeted, isOpen]);

  // Auto-dismiss the nudge bubble.
  useEffect(() => {
    if (!showBubble) return;
    const t = setTimeout(() => setShowBubble(false), 6500);
    return () => clearTimeout(t);
  }, [showBubble]);

  // Flash a happy reaction whenever Dex finishes answering.
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (messages.length > 1 && last?.role === "assistant" && !isTyping) {
      setJustReplied(true);
      const t = setTimeout(() => setJustReplied(false), 1500);
      return () => clearTimeout(t);
    }
  }, [messages, isTyping]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const sendMessage = async (raw: string) => {
    const trimmedInput = raw.trim();
    if (!trimmedInput || isTyping) return;

    const userMessage: Message = {
      role: "user",
      content: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const allMessages = [...messages, userMessage];
      const firstUserIdx = allMessages.findIndex((m) => m.role === "user");
      const sanitizedMessages = firstUserIdx === -1 ? allMessages : allMessages.slice(firstUserIdx);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: sanitizedMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => sendMessage(input);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setShowBubble(false);
    setGreetingActive(false);
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={containerRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[76px] right-0 w-[90vw] sm:w-[380px] h-[520px] max-h-[calc(100vh-120px)] bg-dzignex-black rounded-[24px] shadow-2xl shadow-black/60 ring-1 ring-dzignex-white/10 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-dzignex-white/10 bg-dzignex-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-dzignex-black ring-1 ring-dzignex-blue/40 flex items-center justify-center overflow-hidden">
                  <Dex state={dexState} className="w-7 h-7" />
                </div>
                <div className="leading-tight">
                  <h3 className="text-dzignex-white font-bold text-sm uppercase tracking-tight">Dex</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inline-flex w-full h-full rounded-full bg-dzignex-blue opacity-60 animate-ping" />
                      <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-dzignex-blue" />
                    </span>
                    <span className="text-dzignex-white/40 text-[10px] uppercase tracking-[0.18em]">
                      Studio Assistant
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-dzignex-white/10 transition-colors text-dzignex-white/50 hover:text-dzignex-white"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages — data-lenis-prevent lets this scroll natively instead
                of the page's Lenis smooth-scroll swallowing the wheel. */}
            <div
              data-lenis-prevent
              className="dex-scroll flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-3"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[86%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-dzignex-blue text-white rounded-br-md"
                        : "bg-dzignex-white/[0.05] border border-dzignex-white/10 text-dzignex-white/90 rounded-bl-md"
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                        li: ({ children }) => <li className="ml-2">{children}</li>,
                        code: ({ node, children }) => {
                          const isInline = !node || node.tagName !== 'pre';
                          return isInline ? (
                            <code className="bg-dzignex-white/10 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
                          ) : (
                            <code className="block bg-dzignex-white/10 px-3 py-2 rounded text-xs font-mono overflow-x-auto">{children}</code>
                          );
                        },
                        pre: ({ children }) => <pre className="bg-dzignex-white/10 p-3 rounded-lg overflow-x-auto mb-2">{children}</pre>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        a: ({ children, href }) => (
                          <a href={href} className="text-dzignex-blue underline underline-offset-2 hover:opacity-80" target="_blank" rel="noopener noreferrer">
                            {children}
                          </a>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-2 border-dzignex-blue/50 pl-3 italic text-dzignex-white/70 mb-2">{children}</blockquote>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {/* Conversation starters — only before the first user message */}
              {messages.length === 1 && !isTyping && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-dzignex-white/15 px-3 py-1.5 text-xs text-dzignex-white/70 hover:border-dzignex-blue hover:text-dzignex-white transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-dzignex-white/[0.05] border border-dzignex-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      {[0, 150, 300].map((d) => (
                        <span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-dzignex-blue/70 animate-bounce"
                          style={{ animationDelay: `${d}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-dzignex-white/10 bg-dzignex-white/[0.02]">
              <div className="flex items-center gap-2 rounded-full px-4 py-2.5 border border-dzignex-white/15 focus-within:border-dzignex-blue transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Message Dex…"
                  className="flex-1 bg-transparent text-dzignex-white placeholder-dzignex-white/35 text-sm outline-none"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-2 rounded-full bg-dzignex-blue hover:bg-dzignex-blue/85 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dex's first-visit nudge */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.button
            type="button"
            onClick={toggleChat}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[76px] right-0 w-max max-w-[340px] text-left bg-dzignex-black text-dzignex-white ring-1 ring-dzignex-white/15 text-[15px] font-medium leading-snug rounded-2xl rounded-br-md px-5 py-3.5 shadow-2xl shadow-black/50"
          >
            <span className="text-dzignex-blue font-bold">[ Dex ]</span> — tell me what you&apos;re building.
            <span
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-dzignex-blue text-white flex items-center justify-center text-[10px] hover:bg-dzignex-blue/80 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full shadow-lg shadow-dzignex-blue/20 flex items-center justify-center text-white"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full border border-dzignex-blue/60"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-14 h-14 rounded-full bg-dzignex-blue flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-14 h-14 rounded-full bg-dzignex-black ring-1 ring-dzignex-blue/40 flex items-center justify-center"
            >
              <Dex track state={dexState} className="w-9 h-9" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
