import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Corporate Transportation in Hyderabad | LOKRYD",
  description:
    "LOKRYD provides employee transportation, staff pickup and drop, corporate car rentals, and campus shuttle services for businesses in Hyderabad.",
  alternates: {
    canonical: "/corporate-mobility",
  },
};

export default function CorporateMobilityPage() {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#16224E]">
      <Navbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative w-full bg-[#16224E] text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 md:px-12 lg:px-20 overflow-hidden" data-theme="dark">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                Enterprise Ground Logistics
              </span>
              <h1 className="font-heading font-black uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
                Corporate Transportation in Hyderabad
              </h1>
              <p className="font-body text-white/85 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                LOKRYD delivers structured employee transportation, staff pickup and drop, and corporate shuttle services for businesses across Hyderabad, supported by technology-enabled operations and professional chauffeurs.
              </p>
              <div className="pt-2">
                <Link href="/contact" className="btn-primary text-base py-3 px-8">
                  Request a Corporate Proposal
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                <Image
                  src="/images/transport/campus-fleet.jpg"
                  alt="LOKRYD corporate mobility fleet lined up at enterprise technology campus"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Corporate Services Grid */}
        <section className="py-20 sm:py-28 px-6 md:px-12 lg:px-20 bg-[#FFFFFF] border-b border-[#16224E]/08">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                Structured Solutions
              </span>
              <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl text-[#16224E]">
                Comprehensive Employee Transit Infrastructure
              </h2>
              <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
                We handle the complete lifecycle of corporate transit so your administrative and HR teams can focus on core business operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="bg-[#F6F8FA] p-8 rounded-2xl border border-[#16224E]/10 space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#16224E]">
                  <Image
                    src="/images/transport/innova-fleet.jpg"
                    alt="Corporate Innova vehicle fleet"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl uppercase text-[#16224E]">
                  Daily Pick-Up & Drop Rosters
                </h3>
                <p className="font-body text-sm text-[#16224E]/75 font-light leading-relaxed">
                  End-to-end management of shift rosters, multi-point employee pick-ups, and guaranteed arrival times with route optimization.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-[#F6F8FA] p-8 rounded-2xl border border-[#16224E]/10 space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#16224E]">
                  <Image
                    src="/images/transport/employee-transit.jpg"
                    alt="Employee transit shuttle coach"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl uppercase text-[#16224E]">
                  Campus & Tech Park Shuttles
                </h3>
                <p className="font-body text-sm text-[#16224E]/75 font-light leading-relaxed">
                  High-capacity passenger coaches connecting metro stations, hubs, and institutional campuses along dedicated schedule loops.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-[#F6F8FA] p-8 rounded-2xl border border-[#16224E]/10 space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#16224E]">
                  <Image
                    src="/images/transport/sedan-fleet.jpg"
                    alt="Corporate car rental sedan fleet"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl uppercase text-[#16224E]">
                  Corporate Car Rental
                </h3>
                <p className="font-body text-sm text-[#16224E]/75 font-light leading-relaxed">
                  Flexible rental packages for executive meetings, VIP client visits, intercity business travel, and temporary project deployments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Advantages */}
        <section className="py-20 sm:py-28 px-6 md:px-12 lg:px-20 bg-[#F6F8FA] border-b border-[#16224E]/08">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                Operational Discipline
              </span>
              <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl text-[#16224E]">
                Why Enterprises Partner With LOKRYD
              </h2>
              <div className="space-y-4 font-body text-base text-[#16224E]/80">
                <div className="flex items-start space-x-3">
                  <span className="text-[#1DAFC8] font-bold mt-0.5">✓</span>
                  <div>
                    <strong className="text-[#16224E]">Verified Chauffeur Network:</strong> Identity-checked, defensively trained, and hospitable drivers assigned to dedicated routes.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#1DAFC8] font-bold mt-0.5">✓</span>
                  <div>
                    <strong className="text-[#16224E]">GPS & Real-Time Telematics:</strong> Complete route visibility and automated tracking to keep daily commutes predictable.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#1DAFC8] font-bold mt-0.5">✓</span>
                  <div>
                    <strong className="text-[#16224E]">Fleet Maintenance Care:</strong> Regularly inspected, sanitized vehicles providing comfort and zero breakdown disruption.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#1DAFC8] font-bold mt-0.5">✓</span>
                  <div>
                    <strong className="text-[#16224E]">Transparent Consolidated Billing:</strong> Monthly invoicing and account management tailored to your company&apos;s procurement standards.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#16224E]/10 space-y-6 shadow-sm">
                <h3 className="font-heading font-black uppercase text-2xl text-[#16224E]">
                  Ready to Optimize Your Workforce Commute?
                </h3>
                <p className="font-body text-[#16224E]/75 text-sm sm:text-base leading-relaxed font-light">
                  Our corporate operations team is ready to analyze your shift rosters, employee pickup clusters, and vehicle capacity requirements.
                </p>
                <div className="pt-2">
                  <Link href="/contact" className="btn-primary w-full text-center py-3.5">
                    Request a Corporate Assessment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
