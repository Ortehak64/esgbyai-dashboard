"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="ESGbyAI Logo"
            width={160}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link href="/features" className="hover:text-emerald-600">
            Features
          </Link>
          <Link href="/dashboard" className="hover:text-emerald-600">
            Dashboard
          </Link>
          <Link href="/assistant" className="hover:text-emerald-600">
            Assistant
          </Link>
          <Link href="/about" className="hover:text-emerald-600">
            About
          </Link>
          <Link href="/contact" className="hover:text-emerald-600">
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="md:hidden bg-white shadow-md flex flex-col space-y-4 px-6 py-4">
          <Link href="/features">Features</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/assistant">Assistant</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      )}
    </header>
  );
}
