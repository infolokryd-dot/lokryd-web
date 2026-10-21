import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "The LOKRYD Standard | Quality & Operational Discipline",
  description:
    "Discover the operational standards, chauffeur verification protocols, and fleet maintenance discipline that set LOKRYD apart.",
  alternates: {
    canonical: "/the-standard",
  },
};

const standardsData = [
  {
    before: "Unpredictable",
    after: "Disciplined",
    beforeDetail: "Late arrivals, unannounced schedule shifts, and inconsistent vendor accountability.",
    afterDetail: "Structured pickup schedules, route optimization, and dependable daily execution.",
  },
  {
    before: "Unsafe",
    after: "Secure",
    beforeDetail: "Unverified drivers, uninspected vehicles, and absent route monitoring.",
    afterDetail: "Background-verified chauffeurs, preventative maintenance schedules, and real-time GPS fleet tracking.",
  },
  {
    before: "Unproductive",
    after: "Serene",
    beforeDetail: "Noisy, cramped cabins where travel time is wasted in frustration.",
    afterDetail: "Sanitized, comfortable interiors designed to turn commute time into productive focus or rest.",
  },
];

export default function TheStandardPage() {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#16224E]">
      <Navbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative w-full bg-[#16224E] text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 md:px-12 lg:px-20 overflow-hidden" data-theme="dark">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                Quality & Governance
              </span>
              <h1 className="font-heading font-black uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
                The LOKRYD Standard
              </h1>
              <p className="font-body text-white/85 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                What we replaced. What we built. How rigorous operational discipline and technological oversight transform corporate transportation.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                <Image
                  src="/images/transport/sedan-fleet.jpg"
                  alt="LOKRYD sedan fleet lined up with discipline"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Matrix */}
        <section className="py-20 sm:py-28 px-6 md:px-12 lg:px-20 bg-[#FFFFFF] border-b border-[#16224E]/08">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                Direct Comparison
              </span>
              <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl text-[#16224E]">
                Eliminating Operational Friction
              </h2>
              <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
                We replace the uncertainty of informal transport vendors with disciplined enterprise logistics.
              </p>
            </div>

            <div className="space-y-0 border-t border-[#16224E]/10">
              {standardsData.map((row) => (
                <div
                  key={row.before}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 border-b border-[#16224E]/10 items-start"
                >
                  <div className="md:col-span-5 space-y-2">
                    <span className="font-mono text-[11px] text-[#16224E]/40 tracking-wider uppercase font-semibold">
                      Conventional Transport
                    </span>
                    <p className="font-heading font-bold text-2xl text-[#16224E]/40 line-through decoration-[#16224E]/25">
                      {row.before}
                    </p>
                    <p className="font-body text-[#16224E]/60 text-sm sm:text-base leading-relaxed">
                      {row.beforeDetail}
                    </p>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-start md:justify-center pt-2 md:pt-6">
                    <span className="text-[#1DAFC8] font-mono text-2xl font-bold select-none" aria-hidden="true">
                      →
                    </span>
                  </div>

                  <div className="md:col-span-5 space-y-2">
                    <span className="font-mono text-[11px] text-[#1DAFC8] tracking-wider uppercase font-semibold">
                      The LOKRYD Standard
                    </span>
                    <p className="font-heading font-black uppercase text-2xl sm:text-3xl text-[#16224E] tracking-tight">
                      {row.after}
                    </p>
                    <p className="font-body text-[#16224E]/80 text-sm sm:text-base leading-relaxed">
                      {row.afterDetail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 Pillars of Standardized Service */}
        <section className="py-20 sm:py-28 px-6 md:px-12 lg:px-20 bg-[#F6F8FA] border-b border-[#16224E]/08">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                Core Disciplines
              </span>
              <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl text-[#16224E]">
                Built Upon Verified Operating Practices
              </h2>
              <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
                Four essential standards embedded into every LOKRYD contract and client relationship.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-white p-7 rounded-2xl border border-[#16224E]/10 space-y-3 shadow-sm">
                <span className="font-mono text-xs text-[#1DAFC8] font-bold">01</span>
                <h3 className="font-heading font-bold text-lg uppercase text-[#16224E]">
                  Verified Chauffeurs
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#16224E]/75 leading-relaxed font-light">
                  Background verified, professionally trained in defensive driving, and certified in customer hospitality.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-[#16224E]/10 space-y-3 shadow-sm">
                <span className="font-mono text-xs text-[#1DAFC8] font-bold">02</span>
                <h3 className="font-heading font-bold text-lg uppercase text-[#16224E]">
                  GPS Route Telematics
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#16224E]/75 leading-relaxed font-light">
                  Live location tracking, route adherence verification, and automated transit reporting for full corporate transparency.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-[#16224E]/10 space-y-3 shadow-sm">
                <span className="font-mono text-xs text-[#1DAFC8] font-bold">03</span>
                <h3 className="font-heading font-bold text-lg uppercase text-[#16224E]">
                  Fleet Maintenance
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#16224E]/75 leading-relaxed font-light">
                  Scheduled mechanical servicing, daily tyre and safety checks, and regular sanitization across all active vehicles.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-[#16224E]/10 space-y-3 shadow-sm">
                <span className="font-mono text-xs text-[#1DAFC8] font-bold">04</span>
                <h3 className="font-heading font-bold text-lg uppercase text-[#16224E]">
                  Accountable Management
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#16224E]/75 leading-relaxed font-light">
                  Dedicated operations coordinators, consolidated monthly invoicing, and responsive resolution for any itinerary change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-12 text-center bg-[#FFFFFF]">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl text-[#16224E]">
              Experience The LOKRYD Standard
            </h2>
            <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
              Connect with our corporate team to implement these standards for your organization.
            </p>
            <div className="pt-2">
              <Link href="/contact" className="btn-primary text-base py-3 px-8">
                Initiate Service
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
