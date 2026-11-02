"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  sender: "bot" | "user";
  text: string;
}

export default function ChatPage() {
  const suggestedQuestions = [
    "What does Comprehensive Insurance cover?",
    "How do I file a claim?",
    "What is Third-Party coverage?",
    "What is Own Damage coverage?",
    "Can I transfer my No Claim Bonus (NCB)?",
    "What documents are required for policy renewal?",
  ];

  const faqDatabase = [
    {
      keywords: ["comprehensive", "all round", "full coverage"],
      answer:
        "Comprehensive Insurance provides end-to-end coverage. It safeguards your vehicle against accidental damages, fire, theft, natural disasters, and also covers third-party liabilities (both bodily injury and third-party property damage).",
    },
    {
      keywords: ["third-party", "third party", "liability", "law", "mandatory"],
      answer:
        "Third-Party Insurance is a legal requirement. It provides financial compensation for bodily injuries, death, or property damage caused to external third parties by your insured vehicle. It does not cover damages to your own vehicle.",
    },
    {
      keywords: ["own damage", "od", "own vehicle", "repair"],
      answer:
        "Own Damage Coverage compensates for repair or replacement expenses if your vehicle is damaged due to road accidents, fire, theft, natural calamities, or vandalism. It complements a standard third-party policy.",
    },
    {
      keywords: ["claim", "file", "accident", "process", "register claim"],
      answer:
        "To register a claim: 1. Notify DriveSure immediately via our portal or helpline. 2. Document the damage. 3. Transfer the vehicle to any of our 5,000+ cashless network partner garages. 4. Our surveyor conducts inspection, and repair costs are settled directly.",
    },
    {
      keywords: ["ncb", "no claim bonus", "bonus", "transfer"],
      answer:
        "Yes, the No Claim Bonus (NCB) belongs to you as the policyholder, not the vehicle. You can retain your accumulated discount (up to 50%) when transferring your policy or purchasing a new vehicle.",
    },
    {
      keywords: ["renew", "renewal", "documents", "expire", "papers"],
      answer:
        "Policy renewal requires only your current policy number and vehicle registration certificate. For uninterrupted policies renewed before the expiration date, no vehicle re-inspection is needed.",
    },
    {
      keywords: ["garage", "cashless", "workshop", "repair center"],
      answer:
        "DriveSure maintains an authorized network of over 5,000 certified workshops nationwide where approved claims are settled directly between DriveSure and the garage.",
    },
    {
      keywords: ["cost", "price", "premium", "quote"],
      answer:
        "Insurance premiums are calculated based on your vehicle make, model, age, city of registration, chosen coverage type, and accumulated No Claim Bonus (NCB).",
    },
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Welcome to DriveSure Insurance Assistant. How can I assist you today with your vehicle insurance, coverage details, or claims process?",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getBotResponse = (userQuery: string): string => {
    const cleanQuery = userQuery.toLowerCase().trim();

    for (const item of faqDatabase) {
      const match = item.keywords.some((kw) => cleanQuery.includes(kw));
      if (match) {
        return item.answer;
      }
    }

    return "Thank you for reaching out to DriveSure Insurance. We could not locate an exact match for your inquiry. Please consult our support team at support@drivesure.com or call our toll-free customer support line at 1800-DRIVESURE for dedicated assistance.";
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend ?? inputMessage).trim();
    if (!query) return;

    const botAnswer = getBotResponse(query);

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        text: query,
      },
      {
        id: prev.length + 2,
        sender: "bot",
        text: botAnswer,
      },
    ]);

    setInputMessage("");
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
              <p className="text-xs text-slate-500">Virtual Support Assistant</p>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active
            </span>
          </div>

          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto px-4 sm:px-6 pt-4 pb-28 overflow-hidden min-h-0">
        {/* Suggested Insurance Questions */}
        <div className="shrink-0 bg-white border border-slate-200 rounded-lg p-3 sm:p-4 mb-3 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
            Suggested Insurance Inquiries
          </p>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => handleSendMessage(question)}
                className="text-xs sm:text-sm bg-slate-50 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 text-slate-700 border border-slate-200 rounded-md px-3 py-1.5 transition-colors text-left"
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
                className={`flex flex-col ${isBot ? "items-start" : "items-end"
                  }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-slate-500">
                    {isBot ? "DriveSure Assistant" : "You"}
                  </span>
                </div>
                <div
                  className={`rounded-lg px-4 py-3 text-sm leading-relaxed max-w-[85%] sm:max-w-[75%] ${isBot
                      ? "bg-slate-100 text-slate-800 border border-slate-200"
                      : "bg-blue-600 text-white"
                    }`}
                >
                  {message.text}
                </div>
              </div>
            );
          })}
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
              placeholder="Type your vehicle insurance question here..."
              className="flex-1 rounded-md border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5 text-center">
            Automated responses are provided for informational inquiries based on standard policy terms.
          </p>
        </div>
      </div>
    </div>
  );
}
