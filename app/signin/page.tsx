// app/signin/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔐 Replace with real auth logic
    console.log("Sign in:", { email, password });
  };

  return (
    <main
      id="main"
      className="min-h-screen flex items-center justify-center bg-gray-50 px-6"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Sign in to your ESGbyAI account
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link
            href="#"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Forgot password?
          </Link>
          <Link
            href="/signup"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Create account
          </Link>
        </div>
      </div>
    </main>
  );
}
