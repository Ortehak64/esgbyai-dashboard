"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

/** Small, reusable reveal-on-scroll wrapper */
function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  from = "up", // "up" | "down" | "left" | "right" | "none"
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: any;
  from?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const translateClass = useMemo(() => {
    switch (from) {
      case "up":
        return "translate-y-4";
      case "down":
        return "-translate-y-4";
      case "left":
        return "translate-x-4";
      case "right":
        return "-translate-x-4";
      default:
        return "";
    }
  }, [from]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // slight delay support
          setTimeout(() => setVisible(true), delay);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as any}
      className={[
        "transition-all duration-500 ease-out will-change-transform will-change-opacity",
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${translateClass}`,
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}

export default function FeaturesPageClient() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const toggle = (id: string) => setOpenFaq((cur) => (cur === id ? null : id));

  const features = [
    {
      icon: "📑",
      title: "Automated ESG Reports",
      desc:
        "Generate CSRD, GRI, SASB, and ISSB-aligned outputs with traceable sources and audit-friendly formatting.",
    },
    {
      icon: "🤖",
      title: "AI-Powered Insights",
      desc: "Surface anomalies, hotspots, and trends across scopes, sites, and suppliers—instantly.",
    },
    {
      icon: "📊",
      title: "Custom Dashboards",
      desc: "Build interactive views of emissions, initiatives, and KPIs with exportable charts.",
    },
    {
      icon: "⚡",
      title: "Risk Detection",
      desc: "Identify ESG risks and opportunities early with proactive alerts and context.",
    },
    {
      icon: "🔗",
      title: "Data Ingestion",
      desc: "Import CSV/XLSX, connect APIs, and unify supplier data with lightweight mapping.",
    },
    {
      icon: "🔒",
      title: "Governance & Controls",
      desc: "Review workflows, approvals, and role-based access so teams work securely.",
    },
  ];

  const faqs = [
    {
      id: "data",
      q: "How do I bring my data in?",
      a:
        "Upload CSV/XLSX directly or connect via simple API adapters. We guide you through mapping to ESG metrics and frameworks.",
    },
    {
      id: "audit",
      q: "Are outputs audit-friendly?",
      a:
        "Yes. Every generated statement can reference underlying evidence with timestamps, authors, and change history.",
    },
    {
      id: "pricing",
      q: "Do you support small teams?",
      a:
        "Absolutely. Start with core dashboards and reporting, then scale seats and integrations as you grow.",
    },
  ];

  return (
    <main id="main" className="px-6">
      {/* HERO */}
      <section className="relative text-center pt-10 md:pt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-white to-white"
        />
        <Reveal from="down">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium shadow-sm">
            <span>⚙️</span> <span>Our Features</span>
          </div>
        </Reveal>

        <Reveal from="up" delay={80}>
          <h1 className="mt-4 text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700 bg-clip-text text-transparent leading-tight">
            Powerful ESG Features
          </h1>
        </Reveal>

        <Reveal from="up" delay={140}>
          <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            ESGbyAI equips you with modern ESG reporting and sustainability tools to stay compliant and competitive.
          </p>
        </Reveal>

        <Reveal from="up" delay={200}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              🚀 Try the dashboard
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-emerald-600 text-emerald-700 font-semibold shadow hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Request a demo
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FEATURE GRID */}
      <section className="max-w-6xl mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} from="up" delay={i * 70}>
            <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition relative">
              <div className="text-2xl">{f.icon}</div>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-1.5 text-gray-700">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* WHAT YOU GET + STANDARDS */}
      <section className="max-w-6xl mx-auto mt-12 grid gap-8 md:grid-cols-2">
        <Reveal from="left">
          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
            <h2 className="text-xl font-semibold text-emerald-700">What you get</h2>
            <ul className="mt-4 space-y-3 text-left">
              {[
                "One-click exports: CSV, XLSX, and PDF",
                "Scope 1–3 tracking with initiatives split",
                "Supplier due-diligence checklists",
                "Versioned narratives and change logs",
                "Evidence vault with citations",
                "Stakeholder-ready share links",
              ].map((it, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 text-emerald-600">✔</span>
                  <span className="text-gray-700">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal from="right" delay={80}>
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6 shadow-md ring-1 ring-emerald-100">
            <h2 className="text-xl font-semibold text-emerald-700">Standards coverage</h2>
            <p className="mt-2 text-gray-700">
              Map your data to major frameworks and keep outputs aligned as guidance evolves.
            </p>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {[
                { k: "CSRD", d: "EU" },
                { k: "GRI", d: "Global" },
                { k: "SASB", d: "Industry" },
                { k: "ISSB", d: "IFRS" },
              ].map((x, idx) => (
                <Reveal key={x.k} from="up" delay={160 + idx * 60}>
                  <div className="rounded-xl bg-white px-3 py-2 text-center shadow ring-1 ring-emerald-100">
                    <div className="font-semibold text-gray-900">{x.k}</div>
                    <div className="text-gray-500">{x.d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto mt-12">
        <Reveal from="up">
          <h2 className="text-center text-xl font-semibold text-emerald-700">FAQs</h2>
        </Reveal>
        <div className="mt-6 space-y-3">
          {faqs.map(({ id, q, a }, idx) => {
            const open = openFaq === id;
            return (
              <Reveal key={id} from="up" delay={idx * 80}>
                <div className="rounded-xl bg-white shadow ring-1 ring-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggle(id)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between gap-3"
                    aria-expanded={open}
                  >
                    <span className="font-medium text-gray-900">{q}</span>
                    <span
                      className={[
                        "text-emerald-700 transition-transform",
                        open ? "rotate-45" : "",
                      ].join(" ")}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={[
                      "grid transition-all duration-200 ease-out",
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-90",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 text-gray-700">{a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto my-14">
        <Reveal from="up">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 ring-1 ring-emerald-100 p-6 text-center">
            <p className="text-gray-700">
              Ready to accelerate ESG work?{" "}
              <Link
                href="/assistant"
                className="text-emerald-700 font-semibold underline underline-offset-4 hover:text-emerald-800"
              >
                Try the AI Assistant
              </Link>{" "}
              or{" "}
              <Link
                href="/contact"
                className="text-emerald-700 font-semibold underline underline-offset-4 hover:text-emerald-800"
              >
                request a live demo
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
