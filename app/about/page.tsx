import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About LOKRYD | Corporate & Private Ground Mobility",
  description:
    "Learn about LOKRYD's mission, vision, and operational commitments to safe, structured, and punctual corporate transportation across Telangana.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#16224E]">
      <Navbar />

      <main id="main-content">
        {/* Editorial Page Hero */}
        <section className="relative w-full bg-[#16224E] text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 md:px-12 lg:px-20 overflow-hidden" data-theme="dark">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                Company Profile
              </span>
              <h1 className="font-heading font-black uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
                Advancing Business Through Purposeful Motion
              </h1>
              <p className="font-body text-white/85 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                LOKRYD was established from the understanding that modern organizations require more than ad-hoc taxi hires — they need a structured, reliable ground mobility system.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                <Image
                  src="/images/transport/campus-fleet.jpg"
                  alt="LOKRYD corporate mobility fleet at enterprise campus"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-20 sm:py-28 px-6 md:px-12 lg:px-20 bg-[#FFFFFF] border-b border-[#16224E]/08">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#F6F8FA] border border-[#16224E]/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-bold block">
                Our Vision
              </span>
              <h2 className="font-heading font-black uppercase text-2xl sm:text-3xl text-[#16224E]">
                Setting the Standard in Ground Transit
              </h2>
              <p className="font-body text-[#16224E]/80 text-base sm:text-lg font-light leading-relaxed">
                To establish ourselves as the trusted commuting partner for organizations while setting the standards for intelligent, sustainable transportation solutions.
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#F6F8FA] border border-[#16224E]/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-bold block">
                Our Mission
              </span>
              <h2 className="font-heading font-black uppercase text-2xl sm:text-3xl text-[#16224E]">
                Seamless, Dependable Connections
              </h2>
              <p className="font-body text-[#16224E]/80 text-base sm:text-lg font-light leading-relaxed">
                To provide safe, reliable, and efficient transportation services that seamlessly connect people and businesses across business hubs and regional corridors.
              </p>
            </div>
          </div>
        </section>

        {/* Company Core Goals */}
        <section className="py-20 sm:py-28 px-6 md:px-12 lg:px-20 bg-[#F6F8FA] border-b border-[#16224E]/08">
          <div className="max-w-7xl mx-auto space-y-14">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                Operational Commitments
              </span>
              <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl text-[#16224E]">
                Three Pillars of LOKRYD Operations
              </h2>
              <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
                Documented directly in our company charter, these three goals govern every contract, route, and chauffeur assignment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Goal 1 */}
              <div className="bg-white p-8 rounded-2xl border border-[#16224E]/10 space-y-4 shadow-sm">
                <span className="font-mono text-xs text-[#1DAFC8] font-bold uppercase tracking-wider">
                  Goal 01
                </span>
                <h3 className="font-heading font-bold text-xl uppercase text-[#16224E]">
                  Customer Satisfaction
                </h3>
                <p className="font-body text-sm text-[#16224E]/75 font-light leading-relaxed">
                  Offer real-time GPS tracking, responsive client support, and transparent corporate pricing at every stage of the journey.
                </p>
              </div>

              {/* Goal 2 */}
              <div className="bg-white p-8 rounded-2xl border border-[#16224E]/10 space-y-4 shadow-sm">
                <span className="font-mono text-xs text-[#1DAFC8] font-bold uppercase tracking-wider">
                  Goal 02
                </span>
                <h3 className="font-heading font-bold text-xl uppercase text-[#16224E]">
                  Safety & Compliance
                </h3>
                <p className="font-body text-sm text-[#16224E]/75 font-light leading-relaxed">
                  Maintain high safety standards, enforce verified chauffeur credentials, and strictly comply with all government transport regulations.
                </p>
              </div>

              {/* Goal 3 */}
              <div className="bg-white p-8 rounded-2xl border border-[#16224E]/10 space-y-4 shadow-sm">
                <span className="font-mono text-xs text-[#1DAFC8] font-bold uppercase tracking-wider">
                  Goal 03
                </span>
                <h3 className="font-heading font-bold text-xl uppercase text-[#16224E]">
                  Fleet Management
                </h3>
                <p className="font-body text-sm text-[#16224E]/75 font-light leading-relaxed">
                  Provide well-maintained, sanitized vehicles with scheduled mechanical inspections to ensure operational consistency and comfort.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 md:px-12 text-center bg-[#FFFFFF]">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl text-[#16224E]">
              Partner With LOKRYD
            </h2>
            <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
              Discover how our structured corporate mobility systems can elevate your employee transit experience.
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
