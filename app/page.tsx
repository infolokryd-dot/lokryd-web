"use client";

import Navbar from "@/components/navbar";
import ScrollRevealManager from "@/components/scroll-reveal-manager";
import IntroHero from "@/components/intro-hero";
import ValueSection from "@/components/value-section";
import AudiencesSection from "@/components/audiences-section";
import ServicesIndex from "@/components/services-index";
import SafetySection from "@/components/safety-section";
import ReliableSection from "@/components/reliable-section";
import PromiseSection from "@/components/promise-section";
import VisionMissionSection from "@/components/vision-mission-section";
import StandardsSection from "@/components/standards-section";
import ClientsSection from "@/components/clients-section";
import EnquirySection from "@/components/enquiry-section";
import Footer from "@/components/footer";

export default function Home() {
  const handlePreselectInquiry = (inquiryType: string) => {
    window.dispatchEvent(
      new CustomEvent("lokryd:select-inquiry", {
        detail: { inquiryType },
      })
    );
  };

  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#16224E]">
      {/* Lightweight Client Reveal Manager */}
      <ScrollRevealManager />

      {/* Fixed Navigation */}
      <Navbar />

      <main id="main-content">
        {/* Section A: Intro + Hero */}
        <IntroHero onPreselectInquiry={handlePreselectInquiry} />

        {/* Section B: Value Statement & Offset Pillars */}
        <ValueSection />

        {/* Section C: Two Audiences (Organizations & Individuals) */}
        <AudiencesSection onPreselectInquiry={handlePreselectInquiry} />

        {/* Section D: Services Index with Sticky Crossfade Image */}
        <ServicesIndex />

        {/* Section E: Safety (The One Dark Moment) */}
        <SafetySection />

        {/* Section F: Reliable by Design */}
        <ReliableSection />

        {/* Section G: The LOKRYD Promise */}
        <PromiseSection />

        {/* Section G.5: Vision & Mission */}
        <VisionMissionSection />

        {/* Section H: Problem → LOKRYD Standard */}
        <StandardsSection />

        {/* Section H.5: Our Clients Infinite Marquee */}
        <ClientsSection />

        {/* Section I: Enquiry Form & Business Contacts */}
        <EnquirySection />
      </main>

      {/* Global Dark Navy Footer */}
      <Footer />
    </div>
  );
}
