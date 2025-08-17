// components/ChatButton.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ChatButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/assistant")}
      aria-label="Open AI Assistant"
      className="fixed bottom-6 right-6 z-[9999] w-16 h-16 md:w-20 md:h-20
                 rounded-full shadow-xl hover:scale-110 transition-transform
                 bg-white border border-gray-300 flex items-center justify-center
                 group overflow-visible"
      style={{ left: "auto" }}   // ✅ force remove any "left" override
    >
      {/* 🌟 Aura */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 md:-inset-4 rounded-full
                   bg-emerald-400/20 blur-xl animate-pulse
                   group-hover:bg-emerald-400/30"
      />

      {/* Outline ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-full
                   ring-2 ring-emerald-300/40 group-hover:ring-emerald-400/60
                   transition"
      />

      {/* 🤖 Bot */}
      <Image
        src="/ai-bot.png"
        alt="AI Assistant Bot"
        width={72}
        height={72}
        className="object-contain relative z-[1] pointer-events-none"
        priority
      />

      {/* Eyes */}
      <span
        aria-hidden
        className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full
                   bg-emerald-400 opacity-60 animate-pulse
                   left-[26%] top-[38%] group-hover:opacity-100 z-[2]"
      />
      <span
        aria-hidden
        className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full
                   bg-emerald-400 opacity-60 animate-pulse
                   right-[26%] top-[38%] group-hover:opacity-100 z-[2]"
      />
    </button>
  );
}
