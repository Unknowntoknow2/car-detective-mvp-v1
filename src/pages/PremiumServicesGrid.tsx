import React from "react";

const premiumFeatures = [
  {
    icon: "⭐️",
    title: "Dealer-Only Data",
    desc: "Access premium valuation data used by professionals.",
  },
  {
    icon: "📊",
    title: "Detailed Market Analysis",
    desc: "Breakdowns by region, mileage, condition, and more.",
  },
  {
    icon: "📸",
    title: "Photo AI Analysis",
    desc: "Upload vehicle photos for instant, AI-powered damage/condition insights.",
  },
  {
    icon: "🔔",
    title: "Real-Time Alerts",
    desc: "Get notified when your vehicle's value changes on the market.",
  },
];

export default function PremiumServicesGrid() {
  return (
    <section className="py-10 px-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Upgrade to Premium 🚀</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {premiumFeatures.map((f, i) => (
          <div key={i} className="rounded-lg bg-white/80 shadow p-6 flex items-start gap-4">
            <div className="text-3xl">{f.icon}</div>
            <div>
              <div className="font-semibold text-lg">{f.title}</div>
              <div className="text-neutral-600">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
