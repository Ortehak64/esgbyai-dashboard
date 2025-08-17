"use client";

import Image from "next/image";
import Link from "next/link";

// set to [] to hide the trust bar
const TRUST_LOGOS: { src: string; alt: string }[] = [
  // { src: "/logos/acme.svg", alt: "Acme" },
  // { src: "/logos/contoso.svg", alt: "Contoso" },
  // { src: "/logos/fabrikam.svg", alt: "Fabrikam" },
  // { src: "/logos/megacorp.svg", alt: "MegaCorp" },
];

export default function HomePageClient() {
  return (
    <main id="main" className="px-6">
      {/* Hero */}
      <section className="relative text-center pt-12 md:pt-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-white to-white" />
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium shadow-sm">
          <span>🌍</span> <span>Welcome to ESGbyAI™</span>
        </div>

        <h1 className="mt-4 text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700 bg-clip-text text-transparent leading-tight">
          AI-Powered ESG Reporting & Sustainability Intelligence
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Streamline ESG compliance, automate reporting (CSRD, GRI, SASB, ISSB), and unlock insights with
          AI-powered dashboards and an integrated ESG assistant.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            🚀 Get Started <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-emerald-600 text-emerald-700 font-semibold shadow hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Learn More
          </Link>
        </div>

        {/* Trust bar (hidden if no logos) */}
        {TRUST_LOGOS.length > 0 && (
          <div className="mt-10 text-gray-500">
            <p className="text-xs uppercase tracking-wide">Trusted by sustainability teams</p>
            <div className="mt-3 flex flex-wrap justify-center gap-6 opacity-80">
              {TRUST_LOGOS.map((l, i) => (
                <div key={i} className="h-6">
                  <Image src={l.src} alt={l.alt} width={96} height={24} className="object-contain opacity-90" />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Product video (robust) */}
      <section className="max-w-4xl mx-auto mt-12">
        {/* Aspect-ratio wrapper ensures visible area */}
        <div className="relative w-full overflow-hidden rounded-2xl ring-1 ring-gray-200 shadow-md" style={{ aspectRatio: "16 / 9" }}>
          <video
            key="esgbyai-demo" // force re-render if source changes
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            // If you don't have a poster image, remove the poster prop
            // poster="/video-poster.png"
          >
            {/* ✅ Rename your file to avoid spaces */}
            <source src="/esgbyai-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="mt-3 text-sm text-gray-600 text-center">
          🎥 Discover ESGbyAI in action.{" "}
          <a href="/features" className="text-emerald-700 font-medium underline underline-offset-4">
            See features
          </a>
        </p>
      </section>

      {/* Assistant + Dashboard previews (kept from your version, lightly polished) */}
      <section className="max-w-6xl mx-auto mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="bg-white rounded-2xl shadow p-6 ring-1 ring-gray-100">
          <h2 className="text-2xl font-bold text-emerald-700">🤖 Your ESG Assistant</h2>
          <p className="mt-2 text-gray-700">
            Ask questions, analyze sustainability data, and get instant guidance on reporting and compliance.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Image src="/ai-bot.png" alt="AI Assistant" width={88} height={88} className="rounded-full border shadow object-contain" />
            <input
              type="text"
              placeholder="Ask something about your ESG performance…"
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Ask the ESG assistant"
            />
          </div>
          <div className="mt-4">
            <Link href="/assistant" className="inline-flex items-center gap-2 text-emerald-700 font-semibold underline underline-offset-4 hover:text-emerald-800">
              Open the Assistant <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 ring-1 ring-gray-100 text-center">
          <h2 className="text-2xl font-bold text-emerald-700">📊 Live ESG Dashboard</h2>
          <p className="mt-2 text-gray-700">Monitor key metrics in real time and export CSV, PDF, or Excel with one click.</p>
          <Image
            src="/dashboard.png"
            alt="Dashboard Preview"
            width={900}
            height={560}
            className="rounded-xl shadow object-contain mx-auto mt-4"
            priority
          />
          <div className="mt-4">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-emerald-700 font-semibold underline underline-offset-4 hover:text-emerald-800">
              View the Dashboard <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Callout */}
      <section className="max-w-6xl mx-auto my-16">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 ring-1 ring-emerald-100 p-6 text-center">
          <p className="text-gray-700">
            Want a guided tour?{" "}
            <Link href="/contact" className="text-emerald-700 font-semibold underline underline-offset-4 hover:text-emerald-800">
              Request a live demo
            </Link>{" "}
            and see how ESGbyAI fits your workflow.
          </p>
        </div>
      </section>
    </main>
  );
}
