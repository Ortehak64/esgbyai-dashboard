"use client";

import { useEffect, useState } from "react";
import ChatButton from "@/components/ChatButton";

export default function FooterAwareChatButton() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={[
        "fixed bottom-6 right-6 z-50",
        "transition-all duration-300 ease-out",
        isFooterVisible
          ? "opacity-0 translate-y-2 pointer-events-none"
          : "opacity-100 translate-y-0 pointer-events-auto",
      ].join(" ")}
      aria-hidden={isFooterVisible}
    >
      <ChatButton />
    </div>
  );
}
