// src/pages/TestimonialsSection.tsx
import React from "react";

export default function TestimonialsSection() {
  return (
    <section className="py-12 bg-white rounded-xl shadow mb-10 text-center">
      <h2 className="text-2xl font-bold mb-8">What Our Users Say</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="max-w-xs mx-auto bg-slate-50 rounded-lg p-6 shadow">
          <div className="mb-4 text-4xl">⭐️⭐️⭐️⭐️⭐️</div>
          <p className="mb-2 text-gray-800 font-medium">
            “Fast, accurate, and easy. I sold my car for $1,200 more than the dealer offered!”
          </p>
          <div className="text-xs text-gray-500">— Alicia W.</div>
        </div>
        <div className="max-w-xs mx-auto bg-slate-50 rounded-lg p-6 shadow">
          <div className="mb-4 text-4xl">⭐️⭐️⭐️⭐️⭐️</div>
          <p className="mb-2 text-gray-800 font-medium">
            “Absolutely love the premium report! Helped me negotiate like a pro.”
          </p>
          <div className="text-xs text-gray-500">— Marcus D.</div>
        </div>
        <div className="max-w-xs mx-auto bg-slate-50 rounded-lg p-6 shadow">
          <div className="mb-4 text-4xl">⭐️⭐️⭐️⭐️⭐️</div>
          <p className="mb-2 text-gray-800 font-medium">
            “No nonsense, no spam, just real values. Highly recommend!”
          </p>
          <div className="text-xs text-gray-500">— Priya S.</div>
        </div>
      </div>
    </section>
  );
}
