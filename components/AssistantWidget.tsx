"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, MessageCircle, X } from "lucide-react";

export default function AssistantWidget() {
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([
    { sender: "bot", text: "👋 Hi! I'm your ESG Assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Thanks! For full analysis, open the Assistant page." },
      ]);
    }, 600);
  };

  return (
    <div className="w-full flex flex-col items-center mb-8"> 
      {/* Launcher (inline, not fixed) */}
      {!widgetOpen && (
        <button
          onClick={() => setWidgetOpen(true)}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-emerald-600 text-white shadow hover:bg-emerald-700 transition"
          title="Chat with AI Assistant"
        >
          <MessageCircle className="w-5 h-5" />
          Chat with ESG Assistant
        </button>
      )}

      {/* Chat box (inline, stacked above socials) */}
      {widgetOpen && (
        <div className="w-full max-w-md bg-white border rounded-2xl shadow-lg flex flex-col mt-4">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b bg-emerald-600 text-white rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Image src="/ai-bot.png" alt="AI Bot" width={28} height={28} className="rounded-full border" />
              <span className="font-semibold">ESG Assistant</span>
            </div>
            <button onClick={() => setWidgetOpen(false)} title="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-64">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-3 py-2 rounded-xl text-sm max-w-[80%] ${
                    m.sender === "user" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-2 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message…"
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
