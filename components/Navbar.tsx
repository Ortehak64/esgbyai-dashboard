"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-44 h-16 transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]">
            <Image
              src="/logo.png"
              alt="ESGbyAI Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { href: "/", label: "Home" },
            { href: "/features", label: "Features" },
            { href: "/dashboard", label: "Dashboard" },
            { href: "/assistant", label: "AI Assistant" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-gray-800 font-medium transition group"
            >
              <span className="group-hover:text-emerald-600 transition">{item.label}</span>
              {/* Glow underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <nav className="flex flex-col space-y-4 p-6">
            {[
              { href: "/", label: "Home" },
              { href: "/features", label: "Features" },
              { href: "/dashboard", label: "Dashboard" },
              { href: "/assistant", label: "AI Assistant" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-800 hover:text-emerald-600 transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
