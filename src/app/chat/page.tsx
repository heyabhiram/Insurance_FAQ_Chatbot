"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  intent?: string;
  sources?: string[];
  confidenceScore?: number;
  isError?: boolean;
}

export default function ChatPage() {
  const suggestedQuestions = [
    // "What does Comprehensive Insurance cover?",
      "How much will insurer pay if car is stolen?",
      "All-round car protection",
    // "What is Insured Declared Value (IDV)?",
      "Can I cancel vehicle insurance after selling my vehicle?",
    // "How does IDV affect my premium?",
    // "How do I file an accidental damage claim?",
    // "Can I transfer my No Claim Bonus (NCB)?",
    "What are the NCB discount slabs?",
    "What is Zero Depreciation add-on?",
    "What is the grace period for policy renewal?",
  ];

  // Conversation Session ID (unique per tab session)
  const [conversationId, setConversationId] = useState<string>("");
  const [backendStatus, setBackendStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const [faqCount, setFaqCount] = useState<number>(0);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial_greeting",
      sender: "bot",
      text: "Hello! Welcome to DriveSure Insurance AI Assistant. How can I help you today with your vehicle insurance, coverage details, IDV, NCB, or claims process?",
      timestamp: "Just now",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation ID on mount
  useEffect(() => {
    const existingId = sessionStorage.getItem("drivesure_conv_id");
    if (existingId) {
      setConversationId(existingId);
    } else {
      const newId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      sessionStorage.setItem("drivesure_conv_id", newId);
      setConversationId(newId);
    }

    // Check backend health
    checkBackendHealth();
  }, []);

  // Smooth scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const checkBackendHealth = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setBackendStatus("online");
        setFaqCount(data.faq_indexed_count || 55);
      } else {
        setBackendStatus("offline");
      }
    } catch {
      setBackendStatus("offline");
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? inputMessage).trim();
    if (!query || isLoading) return;

    const userMessageTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: userMessageTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const activeSessionId = conversationId || "default_session";
      const response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
          conversation_id: activeSessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      const botMsg: Message = {
        id: `bot_${Date.now()}`,
        sender: "bot",
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        intent: data.intent,
        sources: data.sources || [],
        confidenceScore: data.confidence_score,
      };

      setMessages((prev) => [...prev, botMsg]);
      setBackendStatus("online");
    } catch (err) {
      console.error("Error communicating with AI Chat backend:", err);
      const errorMsg: Message = {
        id: `err_${Date.now()}`,
        sender: "bot",
        text: "Trouble connecting to the insurance knowledge server. Please ensure the backend is running!",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
      setBackendStatus("offline");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    const newId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    sessionStorage.setItem("drivesure_conv_id", newId);
    setConversationId(newId);
    setMessages([
      {
        id: "initial_greeting",
        sender: "bot",
        text: "Conversation reset! How can I assist you with vehicle insurance, coverage details, IDV, NCB, or claims today?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="shrink-0 border-b border-slate-200 bg-white z-20">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                DriveSure Insurance
              </h1>
              <p className="text-xs text-slate-500">
                AI Vehicle Insurance Assistant
              </p>
            </div>

            {/* Live Backend Connection Indicator */}
            {backendStatus === "online" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {/*AI Backend Online ({faqCount} FAQs)*/}
                Active
              </span>
            )}
            {backendStatus === "checking" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                Connecting...
              </span>
            )}
            {backendStatus === "offline" && (
              <button
                onClick={checkBackendHealth}
                title="Click to retry connecting"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
              >
                <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                Backend Offline (Retry)
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleClearChat}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded border border-slate-200"
            >
              Reset Chat
            </button>
            <Link
              href="/"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto px-4 sm:px-6 pt-4 pb-28 overflow-hidden min-h-0">
        {/* Suggested Insurance Inquiries */}
        <div className="shrink-0 bg-white border border-slate-200 rounded-lg p-3 sm:p-4 mb-3 shadow-xs">
          <p className="text-xs font-semibold auppercase tracking-wider text-slate-500 mb-2">
            Frequently asked Insurance Inquiries
          </p>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                disabled={isLoading}
                onClick={() => handleSendMessage(question)}
                className="text-xs sm:text-sm bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 text-slate-700 border border-slate-200 rounded-md px-3 py-1.5 transition-colors text-left disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Message Container */}
        <div className="flex-1 overflow-y-auto space-y-4 bg-white border border-slate-200 rounded-lg p-4 sm:p-6 min-h-0 shadow-xs">
          {messages.map((message) => {
            const isBot = message.sender === "bot";
            return (
              <div
                key={message.id}
                className={`flex flex-col ${
                  isBot ? "items-start" : "items-end"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-slate-500">
                    {isBot ? "DriveSure Assistant" : "You"}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {message.timestamp}
                  </span>
                </div>

                <div
                  className={`rounded-lg px-4 py-3 text-sm leading-relaxed max-w-[85%] sm:max-w-[75%] ${
                    isBot
                      ? message.isError
                        ? "bg-rose-50 text-rose-800 border border-rose-200"
                        : "bg-slate-100 text-slate-800 border border-slate-200"
                      : "bg-emerald-600 text-white shadow-xs"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>

                  {/* Metadata: Sources & Intent for transparent responses */}
                  {isBot && (message.sources?.length || message.intent) ? (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/70 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      {message.intent && message.intent !== "unknown" && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                          Intent: {message.intent.replace(/_/g, " ")}
                        </span>
                      )}
                      {message.confidenceScore !== undefined &&
                        message.confidenceScore > 0 && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium">
                            Match:{" "}
                            {Math.round(message.confidenceScore * 100)}%
                          </span>
                        )}
                      {message.sources && message.sources.length > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="text-slate-400">Sources:</span>
                          {message.sources.map((src) => (
                            <span
                              key={src}
                              className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600 font-semibold"
                            >
                              {src}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-500">
                  DriveSure Assistant
                </span>
                <span className="text-[10px] text-slate-400">Thinking...</span>
              </div>
              <div className="rounded-lg px-4 py-3 bg-slate-100 border border-slate-200 text-slate-500 text-sm flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-600 animate-bounce"></span>
                <span
                  className="inline-block h-2 w-2 rounded-full bg-emerald-600 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="inline-block h-2 w-2 rounded-full bg-emerald-600 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
                <span className="text-xs text-slate-500 ml-1">
                  Searching verified knowledge base...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Fixed Text Enter and Send Box */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 px-4 py-3 sm:py-3.5 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Type your vehicle insurance question here (e.g., 'What is IDV and how is it calculated?')..."
              className="flex-1 rounded-md border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="rounded-md bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-xs"
            >
              {isLoading ? "Searching..." : "Send"}
            </button>
          </div>
          <div className="flex items-center justify-center text-[11px] text-slate-500 mt-1.5 px-1">
            {/*<span>*/}
            {/*  Powered by FastAPI &bull; Sentence Transformers &bull; ChromaDB*/}
            {/*  &bull; TCS GenAI Lab*/}
            {/*</span>*/}
            {/*<span>*/}
            {/*  Session:{" "}*/}
            {/*  <code className="text-slate-600 font-mono">*/}
            {/*    {conversationId || "initializing"}*/}
            {/*  </code>*/}
            {/*</span>*/}
            <span>
              AI powered vehicle insurance assistant. Keep your vehicle insured.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
