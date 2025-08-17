"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPageClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  // Honeypot (bots fill this, humans won't)
  const [website, setWebsite] = useState("");

  const MAX_MSG = 1000;

  const validate = () => {
    const e: string[] = [];
    if (!name.trim()) e.push("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.push("Please enter a valid email address.");
    if (!message.trim()) e.push("Please write a short message.");
    if (message.length > MAX_MSG) e.push(`Message must be under ${MAX_MSG} characters.`);
    if (website.trim()) e.push("Spam detected.");
    setErrors(e);
    return e.length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      // Replace with your API endpoint (e.g., /api/contact)
      // await fetch("/api/contact", { method:"POST", body: JSON.stringify({ name, email, subject, message }) })
      await new Promise((r) => setTimeout(r, 800)); // demo delay
      setSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setErrors(["Something went wrong while sending your message. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main" className="px-6">
      {/* Hero */}
      <section className="text-center pt-10 md:pt-16">
        <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium shadow-sm">
          ✉️ Contact
        </div>
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
          Let’s Talk Sustainability
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          We’re here to help with ESG reporting, dashboards, and intelligence.
        </p>

        {/* Chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-gray-700 ring-1 ring-emerald-200 shadow-sm">
            <MapPin className="h-4 w-4 text-emerald-700" />
            Lewes, Delaware, United States
          </span>
          <a
            href="mailto:contact@esgbyai.com"
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-emerald-700 ring-1 ring-emerald-200 shadow-sm hover:bg-emerald-50 transition"
          >
            <Mail className="h-4 w-4" />
            contact@esgbyai.com
          </a>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto mt-10 md:mt-14 grid gap-8 md:grid-cols-5">
        {/* Info cards */}
        <aside className="md:col-span-2 space-y-4">
          <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-100">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Our Location</h3>
                <p className="mt-1 text-sm text-gray-600">Lewes, Delaware, United States</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-100">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <a
                  href="mailto:contact@esgbyai.com"
                  className="mt-1 block text-sm text-emerald-700 hover:underline"
                >
                  contact@esgbyai.com
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-100">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Hours</h3>
                <p className="mt-1 text-sm text-gray-600">Mon–Fri · 9:00–18:00 (ET)</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Contact form */}
        <div className="md:col-span-3">
          <form
            onSubmit={onSubmit}
            className="bg-white rounded-2xl shadow-md ring-1 ring-gray-100 p-6 md:p-8 text-left"
          >
            <h2 className="text-lg font-semibold text-emerald-700">Send us a message</h2>

            {/* Errors */}
            {errors.length > 0 && (
              <ul className="mt-4 space-y-1 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errors.map((e, i) => (
                  <li key={i}>• {e}</li>
                ))}
              </ul>
            )}

            {/* Success */}
            {sent && errors.length === 0 && (
              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-800 text-sm">
                ✅ Thanks! Your message has been sent. We’ll get back to you soon.
              </div>
            )}

            {/* Honeypot (hidden) */}
            <div className="hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  placeholder="jane@company.com"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject (optional)
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                placeholder="e.g., CSRD reporting question"
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <span className="text-xs text-gray-500">
                  {message.length}/{MAX_MSG}
                </span>
              </div>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, MAX_MSG))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                placeholder="Tell us a bit about your ESG needs…"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex items-center justify-center w-full md:w-auto gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-white font-semibold shadow hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              <Send className="h-4 w-4" />
              {loading ? "Sending…" : "Send message"}
            </button>
            <p className="mt-3 text-xs text-gray-500">
              By submitting, you agree to our{" "}
              <a href="/terms" className="underline underline-offset-2 hover:text-emerald-700">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline underline-offset-2 hover:text-emerald-700">
                Privacy Policy
              </a>.
            </p>
          </form>
        </div>
      </section>

      {/* Decorative gradient section */}
      <div className="max-w-6xl mx-auto mt-12 mb-16">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 ring-1 ring-emerald-100 p-6 text-center text-sm text-gray-600">
          Prefer a live demo?{" "}
          <a href="/contact" className="text-emerald-700 font-medium underline underline-offset-4">
            Request a walkthrough
          </a>{" "}
          and we’ll tailor it to your use case.
        </div>
      </div>
    </main>
  );
}
