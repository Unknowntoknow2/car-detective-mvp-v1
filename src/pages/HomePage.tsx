import React, { useRef, useState } from "react";
import AnnouncementBar from "@/components/marketing/AnnouncementBar";
import EnhancedHeroSection from "@/pages/EnhancedHeroSection";
import KeyFeatures from "@/pages/KeyFeatures";
import ValuePropositionSection from "@/pages/ValuePropositionSection";
import MarketingBanner from "@/components/marketing/MarketingBanner";
import PremiumServicesGrid from "@/pages/PremiumServicesGrid";
import TestimonialsSection from "@/pages/TestimonialsSection";
import ComparisonTable from "@/pages/ComparisonTable";
import LookupTabs from "@/components/lookup/LookupTabs";

export default function Index() {
  const valuationRef = useRef<HTMLDivElement>(null);

  // Scroll to the valuation form section
  const scrollToValuation = () => {
    valuationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="animate-fade-in">
      <AnnouncementBar />
      <main>
        <EnhancedHeroSection onFreeValuationClick={scrollToValuation} />
        <KeyFeatures />
        <ValuePropositionSection />
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <MarketingBanner />
        </div>
        <PremiumServicesGrid />
        <TestimonialsSection />
        <ComparisonTable />
        <div ref={valuationRef} className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Get Your Vehicle Valuation
            </h2>
            <LookupTabs />
          </div>
        </div>
      </main>
    </div>
  );
}
