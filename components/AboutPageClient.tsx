"use client";

export default function AboutPageClient() {
  return (
    <main className="relative mt-6 md:mt-8 text-center px-6">
      {/* Top frame */}
      <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mb-4 shadow-sm">
        🏢 About ESGbyAI
      </div>

      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent mb-6 leading-snug">
        Our Mission & Vision
      </h1>

      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
        ESGbyAI™ helps organizations turn sustainability into a strategic advantage with
        AI-powered ESG reporting, analytics, and automation — built for CSRD, GRI, SASB,
        and ISSB standards.
      </p>

      {/* Old info / company blurb */}
      <section className="max-w-4xl mx-auto text-left mb-12">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3">About ESGbyAI™</h2>
          <p className="text-gray-700 leading-relaxed">
            We combine modern data pipelines with explainable AI to simplify ESG workflows:
            ingesting your data, mapping it to the right framework, and generating audit-ready
            outputs. Our dashboards reveal hotspots and opportunities, while our assistant helps
            teams answer compliance questions and draft disclosures with confidence.
          </p>
        </div>
      </section>

      {/* Mission & Vision frames */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 text-left mb-16">
        {/* Mission */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
            🎯 Mission
          </div>
          <h3 className="text-xl font-semibold text-emerald-700 mb-2">
            Make ESG reporting effortless and actionable
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Empower every company to measure, report, and improve ESG performance with speed
            and clarity — reducing manual effort while increasing trust and transparency.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
            <li>Automate CSRD/GRI/SASB/ISSB disclosures</li>
            <li>Unify data sources into one dependable ESG model</li>
            <li>Turn insights into measurable outcomes</li>
          </ul>
        </div>

        {/* Vision */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
            🌍 Vision
          </div>
          <h3 className="text-xl font-semibold text-emerald-700 mb-2">
            A world where sustainability is default
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Enable data-driven decisions that balance growth and responsibility — making
            sustainable operations the simplest and smartest path forward.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
            <li>Real-time ESG intelligence for every team</li>
            <li>Audit-ready transparency across the value chain</li>
            <li>Continuous improvement through AI guidance</li>
          </ul>
        </div>
      </section>

      {/* Values (optional, aligned with Features styling) */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-left">
        <div className="p-5 bg-white rounded-xl shadow">
          <h4 className="text-emerald-700 font-semibold mb-2">🔒 Trust</h4>
          <p className="text-gray-700">Security, privacy, and traceability built into every workflow.</p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow">
          <h4 className="text-emerald-700 font-semibold mb-2">🧠 Clarity</h4>
          <p className="text-gray-700">Explainable AI and clean reporting your stakeholders understand.</p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow">
          <h4 className="text-emerald-700 font-semibold mb-2">⚡ Velocity</h4>
          <p className="text-gray-700">Faster compliance cycles, fewer manual steps, better decisions.</p>
        </div>
      </section>
    </main>
  );
}
