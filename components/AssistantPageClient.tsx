"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Msg = { from: "bot" | "user"; text: string };

export default function AssistantPageClient() {
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hello 👋 I’m your ESG assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  // ✨ quick suggestions (auto choices)
  const suggestions = [
    "Generate a CSRD-ready ESG summary",
    "Top ESG risks for fintech",
    "Draft a Scope 1–3 emissions plan",
    "Supplier due‑diligence checklist",
  ];

  const sendMessage = (text?: string) => {
    const payload = (text ?? input).trim();
    if (!payload) return;
    setMessages((m) => [...m, { from: "user", text: payload }]);
    setInput("");
    // fake bot response
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "bot", text: "🤖 Thanks! I'm processing your request..." },
      ]);
    }, 600);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="px-6 text-center">
      {/* Small top frame */}
      <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mt-6 mb-4 shadow-sm">
        🤖 AI Assistant
      </div>

      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent mb-6">
        Your ESG Assistant
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
        Ask questions, generate ESG reports, and get real-time sustainability insights.
      </p>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
        <Image src="/ai-bot.png" alt="AI Assistant Bot" width={120} height={120} className="mb-4" />

        {/* Messages */}
        <div className="w-full max-h-[460px] h-[320px] overflow-y-auto mb-4 space-y-2 text-left">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.from === "bot"
                  ? "bg-emerald-50 text-emerald-900 border border-emerald-100"
                  : "bg-emerald-600 text-white ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Suggestions (auto choices) */}
        <div className="w-full mb-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(s)}
                className="group rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-sm text-emerald-700 hover:bg-emerald-50 transition"
                aria-label={`Use suggestion: ${s}`}
              >
                <span className="mr-1">✨</span>
                <span className="underline-offset-4 group-hover:underline">{s}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2 w-full">
          <input
            className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Type your ESG question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            onClick={() => sendMessage()}
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
