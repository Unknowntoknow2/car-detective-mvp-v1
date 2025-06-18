import React from "react";
export default function EnhancedHeroSection({ onFreeValuationClick }: { onFreeValuationClick?: () => void }) {
  return (
    <section className="py-16 bg-blue-50 text-center rounded-xl mb-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to Car Detective</h1>
      <p className="text-lg mb-8">Unlock instant, data-driven vehicle appraisals for any car in seconds.</p>
      <button
        onClick={onFreeValuationClick}
        className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition"
      >
        Get Free Valuation
      </button>
    </section>
  );
}
