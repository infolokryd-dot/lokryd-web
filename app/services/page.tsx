import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ServicesPinnedShowcase from "@/components/services-pinned-showcase";

export const metadata: Metadata = {
  title: "Mobility Services | LOKRYD Corporate & Private Ground Transit",
  description:
    "Explore LOKRYD's core transportation capabilities: corporate employee transit rosters, high-capacity commuter shuttles, and executive chauffeur services.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#16224E]">
      <Navbar />

      <main id="main-content">
        {/* Editorial Services Header */}
        <section className="relative w-full bg-[#16224E] text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 md:px-12 lg:px-20 overflow-hidden" data-theme="dark">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
              Mobility Capabilities
            </span>
            <h1 className="font-heading font-black uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95] max-w-4xl">
              Precision Ground Transportation Architecture
            </h1>
            <p className="font-body text-white/85 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
              From large-scale daily employee commuter fleets to executive airport transfers, LOKRYD delivers punctual, verified, and technology-monitored journeys.
            </p>
          </div>
        </section>

        {/* The Interactive Pinned Services Showcase */}
        <ServicesPinnedShowcase />

        {/* Detailed Service Matrix */}
        <section className="py-20 sm:py-28 px-6 md:px-12 lg:px-20 bg-[#F6F8FA] border-b border-[#16224E]/08">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                Comprehensive Fleet Scope
              </span>
              <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl text-[#16224E]">
                Operational Disciplines & Vehicle Configurations
              </h2>
              <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
                Review our full spectrum of transportation capabilities configured to match your organization&apos;s transit scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Category 1 */}
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#16224E]/10 space-y-5 shadow-sm">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#16224E]">
                  <Image
                    src="/images/transport/innova-fleet.jpg"
                    alt="LOKRYD corporate Innova Crysta fleet"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="font-heading font-black text-2xl uppercase text-[#16224E]">
                  Corporate Employee Transportation
                </h3>
                <p className="font-body text-sm sm:text-base text-[#16224E]/75 font-light leading-relaxed">
                  End-to-end management of daily pick-up and drop rosters with route optimization, verified chauffeurs, and dedicated account support across Telangana.
                </p>
                <div className="pt-2">
                  <Link
                    href="/corporate-mobility"
                    className="link-arrow text-sm font-semibold text-[#211F5A] hover:text-[#1DAFC8]"
                  >
                    <span className="link-text">Explore Corporate Mobility</span>
                    <span className="arrow-symbol text-[#1DAFC8] ml-2">→</span>
                  </Link>
                </div>
              </div>

              {/* Category 2 */}
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#16224E]/10 space-y-5 shadow-sm">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#16224E]">
                  <Image
                    src="/images/transport/airport-chauffeur.jpg"
                    alt="Executive airport transfer chauffeur and sedan"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="font-heading font-black text-2xl uppercase text-[#16224E]">
                  Private & Executive Chauffeur
                </h3>
                <p className="font-body text-sm sm:text-base text-[#16224E]/75 font-light leading-relaxed">
                  Punctual airport pick-ups, executive corporate car rentals, and comfortable intercity journeys in sanitized vehicles with Wi-Fi enabled cabins.
                </p>
                <div className="pt-2">
                  <Link
                    href="/private-mobility"
                    className="link-arrow text-sm font-semibold text-[#211F5A] hover:text-[#1DAFC8]"
                  >
                    <span className="link-text">Explore Private Mobility</span>
                    <span className="arrow-symbol text-[#1DAFC8] ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-12 text-center bg-[#FFFFFF]">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl text-[#16224E]">
              Request a Custom Fleet Proposal
            </h2>
            <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
              Connect with our mobility planners to review your organization&apos;s transit rosters and receive tailored vehicle recommendations.
            </p>
            <div className="pt-2">
              <Link href="/contact" className="btn-primary text-base py-3 px-8">
                Make an Enquiry
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
