"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Copy, Check, Trash2, Plus, Phone, ExternalLink } from "lucide-react";
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
  "What properties are available?",
  "Do you have 3BHK apartments?",
  "Show luxury apartments",
  "Properties under ₹20,000",
  "Schedule a visit",
  "Contact agent",
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
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full"
          style={{ background: "var(--accent-gold)" }}
          animate={{ y: [0, -6, 0] }}
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
      className="chatbot-action-btn flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors"
      title="Copy response"
    >
      {copied ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <Copy className="h-3 w-3" style={{ color: "var(--foreground-muted)" }} />
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
    <div className="flex flex-wrap gap-2 mt-3">
      <a
        href={`tel:${phone}`}
        className="chatbot-suggested-action flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
      >
        <Phone className="h-3 w-3" />
        Call Now
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="chatbot-suggested-action flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
      >
        <ExternalLink className="h-3 w-3" />
        WhatsApp
      </a>
      <a
        href="/contact"
        className="chatbot-suggested-action flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
      >
        <ExternalLink className="h-3 w-3" />
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
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg md:h-16 md:w-16"
        style={{
          bottom: isOpen ? "calc(100vh - 80px)" : "96px",
          right: "24px",
          background: isOpen
            ? "hsl(220, 20%, 12%)"
            : "linear-gradient(135deg, hsl(42, 78%, 55%) 0%, hsl(38, 85%, 48%) 100%)",
          boxShadow: isOpen
            ? "0 4px 16px hsla(0, 0%, 0%, 0.3)"
            : "0 4px 24px hsla(42, 78%, 55%, 0.3)",
          transition: "bottom 0.3s ease, background 0.3s ease",
        }}
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
            >
              <MessageSquare className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring (only when closed) */}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              animation: "chatbot-pulse 3s ease-out infinite",
              background: "hsla(42, 78%, 55%, 0.3)",
            }}
          />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl"
            style={{
              bottom: "24px",
              right: "24px",
              width: "min(400px, calc(100vw - 48px))",
              height: "min(580px, calc(100vh - 100px))",
              background: "var(--background)",
              border: "1px solid hsla(220, 20%, 4%, 0.1)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, hsl(220, 20%, 6%) 0%, hsl(220, 18%, 10%) 100%)",
                borderBottom: "1px solid hsla(42, 78%, 55%, 0.15)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(42, 78%, 55%) 0%, hsl(38, 85%, 48%) 100%)",
                  }}
                >
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3
                    className="font-display text-sm font-semibold"
                    style={{ color: "hsl(0, 0%, 98%)" }}
                  >
                    Shivaay Realty AI
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span
                      className="font-accent text-[10px]"
                      style={{ color: "hsl(220, 10%, 55%)" }}
                    >
                      Online
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleNewChat}
                  className="rounded-lg p-2 transition-colors hover:bg-white/10"
                  title="New chat"
                >
                  <Plus className="h-4 w-4 text-white/60" />
                </button>
                <button
                  onClick={handleNewChat}
                  className="rounded-lg p-2 transition-colors hover:bg-white/10"
                  title="Clear chat"
                >
                  <Trash2 className="h-4 w-4 text-white/60" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 transition-colors hover:bg-white/10"
                  title="Close"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full"
                    style={{
                      background: "var(--accent-gold-muted)",
                    }}
                  >
                    <MessageSquare
                      className="h-6 w-6"
                      style={{ color: "var(--accent-gold)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-display text-base font-medium mb-1"
                      style={{ color: "var(--foreground)" }}
                    >
                      Welcome to Shivaay Realty
                    </p>
                    <p
                      className="font-accent text-xs"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      Ask me about properties, pricing, locations, and more
                    </p>
                  </div>

                  {/* Suggested questions */}
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="chatbot-suggestion rounded-full px-3 py-1.5 text-xs font-medium transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex flex-col ${
                        msg.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`chatbot-msg relative max-w-[85%] rounded-2xl px-4 py-3 ${
                          msg.role === "user"
                            ? "chatbot-msg-user"
                            : "chatbot-msg-assistant"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <div className="chatbot-markdown prose prose-sm max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.content || "​"}
                            </ReactMarkdown>
                            {/* Blinking cursor while streaming */}
                            {isStreaming &&
                              msg.id ===
                                messages[messages.length - 1]?.id && (
                                <span className="chatbot-cursor" />
                              )}
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        )}
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center gap-2 mt-1 px-1">
                        <span
                          className="text-[10px]"
                          style={{ color: "var(--foreground-muted)" }}
                        >
                          {formatTime(msg.timestamp)}
                        </span>
                        {msg.role === "assistant" && msg.content && (
                          <CopyButton text={msg.content} />
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isStreaming &&
                    messages[messages.length - 1]?.role === "user" && (
                      <div className="flex items-start">
                        <div className="chatbot-msg-assistant rounded-2xl">
                          <TypingIndicator />
                        </div>
                      </div>
                    )}

                  {/* Action buttons after last assistant message */}
                  {showActions && <ActionButtons />}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Suggested questions bar (when chat has messages) */}
            {messages.length > 0 && !isStreaming && (
              <div
                className="shrink-0 overflow-x-auto px-4 py-2 flex gap-2 border-t"
                style={{
                  borderColor: "hsla(220, 20%, 4%, 0.06)",
                  scrollbarWidth: "none",
                }}
              >
                {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="chatbot-suggestion shrink-0 rounded-full px-3 py-1 text-[11px] font-medium transition-all whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 shrink-0 border-t"
              style={{ borderColor: "hsla(220, 20%, 4%, 0.08)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about properties..."
                disabled={isStreaming}
                maxLength={2000}
                className="chatbot-input flex-1 rounded-xl px-4 py-2.5 text-sm transition-all outline-none"
                style={{
                  background: "var(--background-secondary)",
                  color: "var(--foreground)",
                  border: "1px solid hsla(220, 20%, 4%, 0.08)",
                  fontFamily: "var(--font-outfit), sans-serif",
                }}
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || isStreaming}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all disabled:opacity-40"
                style={{
                  background:
                    input.trim() && !isStreaming
                      ? "linear-gradient(135deg, hsl(42, 78%, 55%) 0%, hsl(38, 85%, 48%) 100%)"
                      : "var(--background-tertiary)",
                }}
              >
                <Send className="h-4 w-4 text-white" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes chatbot-pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          70% {
            transform: scale(1.45);
            opacity: 0;
          }
          100% {
            transform: scale(1.45);
            opacity: 0;
          }
        }

        .chatbot-msg-user {
          background: linear-gradient(
            135deg,
            hsl(42, 78%, 55%) 0%,
            hsl(38, 85%, 48%) 100%
          );
          color: white;
          border-bottom-right-radius: 6px;
        }

        .chatbot-msg-assistant {
          background: var(--background-secondary);
          color: var(--foreground);
          border: 1px solid hsla(220, 20%, 4%, 0.06);
          border-bottom-left-radius: 6px;
        }

        .chatbot-suggestion {
          background: var(--accent-gold-muted);
          color: var(--accent-gold-dark);
          border: 1px solid hsla(42, 78%, 55%, 0.2);
        }
        .chatbot-suggestion:hover {
          background: hsla(42, 78%, 55%, 0.25);
          transform: translateY(-1px);
        }

        .chatbot-suggested-action {
          background: var(--accent-gold-muted);
          color: var(--accent-gold-dark);
          border: 1px solid hsla(42, 78%, 55%, 0.2);
        }
        .chatbot-suggested-action:hover {
          background: hsla(42, 78%, 55%, 0.25);
          box-shadow: 0 2px 8px hsla(42, 78%, 55%, 0.15);
        }

        .chatbot-action-btn:hover {
          background: var(--background-secondary);
        }

        .chatbot-input:focus {
          border-color: var(--accent-gold) !important;
          box-shadow: 0 0 0 3px hsla(42, 78%, 55%, 0.1);
        }

        .chatbot-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: var(--accent-gold);
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: chatbot-blink 0.8s step-end infinite;
        }

        @keyframes chatbot-blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .chatbot-markdown h1,
        .chatbot-markdown h2,
        .chatbot-markdown h3,
        .chatbot-markdown h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          margin-top: 0.5rem;
          color: var(--foreground);
          font-family: var(--font-outfit), sans-serif;
          line-height: 1.4;
        }

        .chatbot-markdown p {
          font-size: 0.8125rem;
          line-height: 1.6;
          margin-bottom: 0.5rem;
          color: var(--foreground-secondary);
        }

        .chatbot-markdown ul,
        .chatbot-markdown ol {
          font-size: 0.8125rem;
          padding-left: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--foreground-secondary);
        }

        .chatbot-markdown li {
          margin-bottom: 0.25rem;
        }

        .chatbot-markdown strong {
          color: var(--foreground);
          font-weight: 600;
        }

        .chatbot-markdown a {
          color: var(--accent-gold);
          text-decoration: underline;
        }

        .chatbot-markdown code {
          font-size: 0.75rem;
          background: var(--background-tertiary);
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
        }

        .chatbot-markdown hr {
          border-color: hsla(220, 20%, 4%, 0.1);
          margin: 0.75rem 0;
        }
      `}</style>
    </>
  );
}
