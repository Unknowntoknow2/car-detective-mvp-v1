import React from "react";

export default function KeyFeatures() {
  const features = [
    {
      icon: "🔎",
      title: "Instant VIN Lookup",
      desc: "Get comprehensive vehicle details instantly from any VIN."
    },
    {
      icon: "💰",
      title: "Market-Powered Pricing",
      desc: "See real, up-to-date market values — not just book prices."
    },
    {
      icon: "📱",
      title: "Mobile-First Experience",
      desc: "Works perfectly on any device — start, snap photos, and get results in seconds."
    }
  ];
  return (
    <section className="py-12 bg-white rounded-xl shadow mb-10">
      <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center max-w-xs mx-auto">
            <div className="text-5xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-base text-neutral-700 text-center">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
