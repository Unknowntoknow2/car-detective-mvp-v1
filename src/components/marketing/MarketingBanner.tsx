import React from "react";

export function MarketingBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white py-3 px-4 text-center font-medium shadow-md mb-8 rounded">
      🚗 Limited Time: Get a free valuation report with every sign-up! <a href="/register" className="underline ml-2">Register Now &rarr;</a>
    </div>
  );
}

export default MarketingBanner;
