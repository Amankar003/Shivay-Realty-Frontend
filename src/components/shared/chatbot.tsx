"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BotMessageSquare, Sparkles, MessageSquare, X, Send, Copy, Check, Trash2, Plus, Phone, ExternalLink, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SITE_CONFIG } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const API_URL = SITE_CONFIG.apiUrl;

const SUGGESTED_QUESTIONS = [
  { icon: "🏠", text: "Available Apartments" },
  { icon: "💰", text: "Properties Under ₹20K" },
  { icon: "📍", text: "Best Locations" },
  { icon: "📅", text: "Schedule Visit" },
  { icon: "📞", text: "Contact Agent" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-slate-400"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API not available */
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded-md transition-colors hover:bg-slate-100 active:scale-95"
      title="Copy response"
    >
      {copied ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <Copy className="h-3 w-3 text-slate-400" />
      )}
    </button>
  );
}

function ActionButtons() {
  const phone = SITE_CONFIG.phone;
  const whatsappUrl = `https://wa.me/916206825676?text=${encodeURIComponent(
    "Hello Shivaay Realty, I am interested in your rental properties. Please help me."
  )}`;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <a
        href={`tel:${phone}`}
        className="flex items-center gap-1.5 rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-950 hover:text-white"
      >
        <Phone className="h-3.5 w-3.5" />
        Call Now
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-950 hover:text-white"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        WhatsApp
      </a>
      <a
        href="/contact"
        className="flex items-center gap-1.5 rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-950 hover:text-white"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        Schedule Visit
      </a>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate session ID on mount
  useEffect(() => {
    setSessionId(generateId());
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsStreaming(true);

      const assistantId = generateId();
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);

      try {
        const response = await fetch(`${API_URL}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text.trim(),
            session_id: sessionId,
          }),
        });

        if (!response.ok) throw new Error("Chat request failed");

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const data = JSON.parse(line.slice(6));
              if (data.done) continue;
              if (data.session_id && !sessionId) {
                setSessionId(data.session_id);
              }
              if (data.token) {
                fullContent += data.token;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId
                      ? { ...msg, content: fullContent }
                      : msg
                  )
                );
              }
            } catch {
              /* skip malformed lines */
            }
          }
        }
      } catch {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? {
                  ...msg,
                  content:
                    "I'm sorry, I couldn't connect to the server. Please try again or contact us at +91 6206825676.",
                }
              : msg
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, sessionId]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleNewChat = useCallback(async () => {
    const oldSessionId = sessionId;
    setMessages([]);
    const newSession = generateId();
    setSessionId(newSession);

    // Clear backend session
    try {
      await fetch(`${API_URL}/chat/session/${oldSessionId}`, {
        method: "DELETE",
      });
    } catch {
      /* silent */
    }
  }, [sessionId]);

  const showActions =
    messages.length > 0 &&
    messages[messages.length - 1].role === "assistant" &&
    !isStreaming;

  return (
    <>
      {/* Floating trigger button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="fixed z-[9999] right-[32px] bottom-[98px] md:bottom-[102px] lg:bottom-[108px] flex items-center justify-center chatbot-btn-container"
      >
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: -16, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-full mr-4 whitespace-nowrap rounded-xl px-4 py-3 text-sm shadow-xl pointer-events-none flex flex-col items-start gap-0.5"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                fontFamily: "var(--font-outfit), sans-serif",
              }}
            >
              <span className="font-semibold text-slate-900 leading-tight">Need help?</span>
              <span className="text-xs text-slate-600 leading-tight">Chat with our AI Assistant</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center rounded-full text-white shadow-xl h-[50px] w-[50px] md:h-[54px] md:w-[54px] lg:h-[60px] lg:w-[60px] bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          aria-label={isOpen ? "Close chat" : "Open AI chat"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="chatbot-icon-container relative flex items-center justify-center"
              >
                <BotMessageSquare className="h-6 w-6 md:h-7 md:w-7 text-white" strokeWidth={1.5} />
                <Sparkles className="chatbot-sparkle absolute -top-1.5 -right-1.5 h-3 w-3 text-yellow-400" strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, type: "spring", stiffness: 400, damping: 30 }}
            className="fixed z-[10000] flex flex-col overflow-hidden rounded-[24px] shadow-[0_10px_35px_rgba(0,0,0,0.08),0_0_25px_rgba(212,175,55,0.10)] border border-[#D4AF37]/25 w-[calc(100vw-32px)] md:w-[360px] lg:w-[420px] h-[80vh] max-h-[650px] bottom-[16px] right-[16px] md:bottom-[102px] lg:bottom-[110px] md:right-[30px]"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.90), rgba(250,248,244,0.90))",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }}
          >
            {/* Ambient glow behind panel */}
            <div 
              className="pointer-events-none absolute inset-0 -z-10 rounded-[24px]"
              style={{
                boxShadow: "0 0 80px 0 rgba(212,175,55,0.08)",
              }}
            />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0 bg-white/60 border-b border-black/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white shadow-sm">
                  <span className="text-xl leading-none">🤖</span>
                </div>
                <div>
                  <h3 className="font-serif text-[17px] font-semibold text-slate-900 tracking-tight leading-none">
                    Shivaay Realty AI
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                      Available Now
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleNewChat}
                  className="rounded-full p-2 transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 text-slate-400 hover:text-slate-700"
                  title="New chat"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 text-slate-400 hover:text-slate-700"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scroll-smooth bg-transparent"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col h-full justify-end pb-2">
                  <div className="flex flex-wrap gap-2 justify-end">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => sendMessage(q.text)}
                        className="flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-950 hover:text-white hover:shadow-md active:scale-95"
                      >
                        <span className="text-[15px] leading-none">{q.icon}</span>
                        <span>{q.text}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 30 }}
                      className={`flex flex-col ${
                        msg.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`relative max-w-[85%] rounded-[20px] px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
                          msg.role === "user"
                            ? "bg-slate-900 text-white rounded-br-[4px]"
                            : "bg-white text-slate-800 border border-black/5 rounded-bl-[4px]"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <div className="chatbot-markdown prose prose-sm max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.content || "​"}
                            </ReactMarkdown>
                            {isStreaming &&
                              msg.id === messages[messages.length - 1]?.id && (
                                <span className="chatbot-cursor" />
                              )}
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-1.5 px-1">
                        <span className="text-[10px] text-slate-400 font-medium">
                          {formatTime(msg.timestamp)}
                        </span>
                        {msg.role === "assistant" && msg.content && (
                          <CopyButton text={msg.content} />
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isStreaming && messages[messages.length - 1]?.role === "user" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start"
                    >
                      <div className="bg-white border border-black/5 rounded-[20px] rounded-bl-[4px] shadow-sm py-2 px-4">
                        <TypingIndicator />
                      </div>
                    </motion.div>
                  )}

                  {showActions && <ActionButtons />}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 shrink-0 bg-transparent">
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center bg-white rounded-full h-[56px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[rgba(0,0,0,0.05)] focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37]/50 transition-all pl-5 pr-2 py-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about properties..."
                  disabled={isStreaming}
                  maxLength={2000}
                  className="flex-1 bg-transparent text-[15px] text-slate-900 placeholder:text-slate-400 outline-none pr-3"
                  style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white transition-all disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  <Send className="h-4 w-4 ml-0.5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .chatbot-btn-container, .chatbot-icon-container, .chatbot-sparkle {
            animation: none !important;
          }
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }

        .chatbot-btn-container {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes tilt-and-sparkle {
          0%, 100% { transform: rotate(0deg); }
          5%, 15% { transform: rotate(10deg); }
          10%, 20% { transform: rotate(-10deg); }
          25%, 95% { transform: rotate(0deg); }
        }

        .chatbot-icon-container {
          animation: tilt-and-sparkle 6s ease-in-out infinite;
        }

        @keyframes sparkle-pulse {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          10%, 20% { opacity: 1; transform: scale(1.2); }
          25%, 95% { opacity: 0; transform: scale(0.5); }
        }

        .chatbot-sparkle {
          animation: sparkle-pulse 6s ease-in-out infinite;
        }

        .chatbot-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: #D4AF37;
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: chatbot-blink 0.8s step-end infinite;
        }

        @keyframes chatbot-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .chatbot-markdown h1,
        .chatbot-markdown h2,
        .chatbot-markdown h3,
        .chatbot-markdown h4 {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          margin-top: 0.5rem;
          color: #0f172a;
          font-family: var(--font-outfit), sans-serif;
          line-height: 1.4;
        }

        .chatbot-markdown p {
          font-size: 0.9375rem;
          line-height: 1.6;
          margin-bottom: 0.5rem;
          color: #334155;
        }

        .chatbot-markdown ul,
        .chatbot-markdown ol {
          font-size: 0.9375rem;
          padding-left: 1.25rem;
          margin-bottom: 0.5rem;
          color: #334155;
        }

        .chatbot-markdown li {
          margin-bottom: 0.25rem;
        }

        .chatbot-markdown strong {
          color: #0f172a;
          font-weight: 600;
        }

        .chatbot-markdown a {
          color: #D4AF37;
          text-decoration: underline;
        }

        .chatbot-markdown code {
          font-size: 0.75rem;
          background: rgba(0,0,0,0.05);
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
        }

        .chatbot-markdown hr {
          border-color: rgba(0,0,0,0.05);
          margin: 0.75rem 0;
        }
      `}</style>
    </>
  );
}
