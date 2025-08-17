// app/signup/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const strength = useMemo(() => {
    // very simple strength heuristic
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[a-z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s; // 0..5
  }, [pw]);

  const strengthLabel = ["Very weak", "Weak", "OK", "Good", "Strong", "Very strong"][strength];
  const strengthColor =
    ["bg-gray-300","bg-red-500","bg-amber-500","bg-yellow-500","bg-green-500","bg-emerald-600"][strength];

  const validate = () => {
    const errs: string[] = [];
    if (!name.trim()) errs.push("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push("Please enter a valid email.");
    if (pw.length < 8) errs.push("Password must be at least 8 characters.");
    if (pw !== pw2) errs.push("Passwords do not match.");
    if (!agree) errs.push("You must accept the Terms & Privacy Policy.");
    setErrors(errs);
    return errs.length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // 🔐 Replace with your real sign-up logic (API call)
    setSubmitted(true);
    console.log("Sign up:", { name, email });
  };

  return (
    <main id="main" className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
          Create your account
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Start using ESGbyAI in minutes.
        </p>

        {submitted ? (
          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
            🎉 Account created! Check your inbox to verify your email. You can now{" "}
            <Link href="/signin" className="font-semibold text-emerald-700 underline underline-offset-4">
              sign in
            </Link>.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Work email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="new-password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute inset-y-0 right-2 my-auto text-gray-500 hover:text-gray-700 text-sm"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>

              {/* Strength meter */}
              <div className="mt-2">
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full ${strengthColor}`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-600">Strength: {strengthLabel}</p>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password2"
                  type={showPw2 ? "text" : "password"}
                  autoComplete="new-password"
                  value={pw2}
                  onChange={(e) => setPw2(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw2((v) => !v)}
                  className="absolute inset-y-0 right-2 my-auto text-gray-500 hover:text-gray-700 text-sm"
                  aria-label={showPw2 ? "Hide password" : "Show password"}
                >
                  {showPw2 ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the{" "}
                <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                  Privacy Policy
                </Link>.
              </label>
            </div>

            {/* Errors */}
            {errors.length > 0 && (
              <ul className="mt-2 space-y-1 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errors.map((e, i) => (
                  <li key={i}>• {e}</li>
                ))}
              </ul>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
            >
              Create account
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-emerald-600 hover:text-emerald-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
