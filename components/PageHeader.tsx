type PageHeaderProps = {
  badge: string;          // e.g. "⚙️ Our Features"
  title: string;          // e.g. "Powerful ESG Features"
  subtitle?: string;      // optional subheading
  className?: string;     // optional extra spacing/utilities
};

export default function PageHeader({ badge, title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <section className={`pt-24 text-center px-6 ${className}`}>
      <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mb-4 shadow-sm">
        {badge}
      </div>
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent mb-6 leading-snug">
        {title}
      </h1>
      {subtitle ? (
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </section>
  );
}
