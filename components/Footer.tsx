"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-emerald-600 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo + blurb */}
          <div className="col-span-2 md:col-span-1">
            <div className="relative w-44 h-20 transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.7)]">
              <Image
                src="/logo.png"
                alt="ESGbyAI Logo"
                fill
                className="object-contain invert brightness-0 contrast-200"
              />
            </div>
            <p className="text-sm text-emerald-100 mt-3">
              AI-powered ESG reporting, dashboards, and sustainability intelligence.
            </p>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-emerald-100 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/features" className="hover:text-white">Features</Link></li>
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link href="/assistant" className="hover:text-white">AI Assistant</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-emerald-100 text-sm">
              <li><a className="hover:text-white">Docs</a></li>
              <li><a className="hover:text-white">Support</a></li>
              <li><a className="hover:text-white">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-emerald-100 text-sm">
              <li>📍 Lewes, Delaware, United States</li>
              <li>📧 contact@esgbyai.com</li>
            </ul>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex justify-center md:justify-start gap-6 mt-10">
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="text-emerald-200 transition transform hover:scale-110 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
          >
            <Linkedin className="w-7 h-7" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="text-emerald-200 transition transform hover:scale-110 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
          >
            <Twitter className="w-7 h-7" />
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            className="text-emerald-200 transition transform hover:scale-110 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
          >
            <Github className="w-7 h-7" />
          </Link>
        </div>

        {/* Bottom row */}
        <div className="border-t border-emerald-500 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-emerald-100">
          <p>© {new Date().getFullYear()} ESGbyAI™. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a className="hover:text-white">Privacy</a>
            <a className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
