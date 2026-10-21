import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Operations & Safety | Documented Practices | LOKRYD",
  description:
    "Review LOKRYD's documented fleet operations: verified chauffeur standards, mechanical maintenance schedules, and GPS fleet tracking protocols.",
  alternates: {
    canonical: "/operations-safety",
  },
};

export default function OperationsSafetyPage() {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#16224E]">
      <Navbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative w-full bg-[#16224E] text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 md:px-12 lg:px-20 overflow-hidden" data-theme="dark">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                Operational Discipline
              </span>
              <h1 className="font-heading font-black uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
                Operations & Safety Architecture
              </h1>
              <p className="font-body text-white/85 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                Verified drivers, regular mechanical maintenance, and continuous GPS telematics oversight delivering safe, predictable ground mobility.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                <Image
                  src="/images/transport/maintenance-bay.jpg"
                  alt="Vehicle preventative maintenance bay"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3 Documented Operational Practices */}
        <section className="py-20 sm:py-28 px-6 md:px-12 lg:px-20 bg-[#FFFFFF] border-b border-[#16224E]/08">
          <div className="max-w-7xl mx-auto space-y-20">
            {/* Practice 1: Chauffeur Verification */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#16224E]/10 shadow-lg bg-[#16224E]">
                  <Image
                    src="/images/transport/chauffeur-portrait.jpg"
                    alt="Professional uniformed corporate chauffeur"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                  Personnel Standards
                </span>
                <h2 className="font-heading font-black uppercase text-2xl sm:text-3xl text-[#16224E]">
                  Verified Chauffeur Protocols
                </h2>
                <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
                  Every driver representing LOKRYD undergoes thorough credential verification and training before being assigned to enterprise passenger routes.
                </p>
                <div className="space-y-2.5 pt-2 text-sm text-[#16224E]/85">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                    <span>Identity, address, and commercial driving license validation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                    <span>Defensive driving training and route orientation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                    <span>Corporate hospitality, client confidentiality, and etiquette standards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice 2: Fleet Maintenance */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                  Mechanical Discipline
                </span>
                <h2 className="font-heading font-black uppercase text-2xl sm:text-3xl text-[#16224E]">
                  Regular Vehicle Maintenance & Sanitization
                </h2>
                <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
                  We enforce preventative servicing schedules and daily checklist inspections to ensure every car, SUV, and coach operates at peak safety.
                </p>
                <div className="space-y-2.5 pt-2 text-sm text-[#16224E]/85">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                    <span>Pre-dispatch checklist covering tyres, brakes, fluids, and lights</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                    <span>Scheduled servicing and authorized mechanical maintenance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                    <span>Daily interior sanitization, cleaning, and climate control maintenance</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#16224E]/10 shadow-lg bg-[#16224E]">
                  <Image
                    src="/images/transport/maintenance-bay.jpg"
                    alt="Hydraulic vehicle lift and preventative maintenance bay"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* Practice 3: GPS Telematics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#16224E]/10 shadow-lg bg-[#16224E]">
                  <Image
                    src="/images/transport/sedan-fleet.jpg"
                    alt="LOKRYD corporate sedan fleet equipped with GPS tracking"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                  Route Oversight
                </span>
                <h2 className="font-heading font-black uppercase text-2xl sm:text-3xl text-[#16224E]">
                  Real-Time GPS Tracking & Telematics
                </h2>
                <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
                  Real-time telematics enable precise coordination of daily pick-up rosters, route optimization, and operational visibility across Telangana.
                </p>
                <div className="space-y-2.5 pt-2 text-sm text-[#16224E]/85">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                    <span>Live vehicle location tracking and route adherence</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                    <span>Direct dispatch coordination for traffic delay mitigation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                    <span>Transparent trip logs and billing reconciliation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-12 text-center bg-[#F6F8FA]">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl text-[#16224E]">
              Discuss Your Safety & Compliance Needs
            </h2>
            <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
              Connect with our fleet coordinators to review our driver verification records, maintenance checklists, and route management capabilities.
            </p>
            <div className="pt-2">
              <Link href="/contact" className="btn-primary text-base py-3 px-8">
                Contact Operations
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
