import React from "react";

export default function ValuePropositionSection() {
  const valueProps = [
    {
      icon: "⚡️",
      title: "Lightning Fast",
      desc: "Get results in under 60 seconds, 24/7. No waiting, no hassle."
    },
    {
      icon: "🔒",
      title: "Accurate & Private",
      desc: "Data is encrypted, results are yours alone. No spam. No reselling."
    },
    {
      icon: "🌎",
      title: "Data From Everywhere",
      desc: "We blend sources: auctions, dealers, private sales — so you always see the real market."
    }
  ];
  return (
    <section className="py-12 bg-neutral-50 rounded-xl shadow mb-10">
      <h2 className="text-3xl font-bold text-center mb-8">Why Car Detective?</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {valueProps.map((p, i) => (
          <div key={i} className="flex flex-col items-center max-w-xs mx-auto">
            <div className="text-5xl mb-3">{p.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-base text-neutral-700 text-center">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
