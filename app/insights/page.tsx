import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Insights | Corporate Mobility & Fleet Perspectives | LOKRYD",
  description:
    "Operational insights, industry updates, and transit briefings from the LOKRYD corporate ground mobility team.",
  alternates: {
    canonical: "/insights",
  },
};

export default function InsightsPage() {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#16224E]">
      <Navbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative w-full bg-[#16224E] text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 md:px-12 lg:px-20 overflow-hidden" data-theme="dark">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
              Knowledge & Operational Perspectives
            </span>
            <h1 className="font-heading font-black uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
              Corporate Mobility Insights
            </h1>
            <p className="font-body text-white/85 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Perspectives, transit optimization frameworks, and operational updates from our ground mobility coordinators in Telangana.
            </p>
          </div>
        </section>

        {/* Editorial Announcement / State (Verified, no invented articles or fake claims) */}
        <section className="py-24 sm:py-32 px-6 md:px-12 lg:px-20 bg-[#FFFFFF]">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#16224E]/05 border border-[#16224E]/10 flex items-center justify-center text-[#1DAFC8]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>

            <div className="space-y-3">
              <h2 className="font-heading font-black uppercase text-2xl sm:text-3xl text-[#16224E]">
                Operational Reports & Industry Briefings
              </h2>
              <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
                Our operations desk produces customized transit audits, employee route efficiency reports, and fleet compliance briefings directly for corporate partners.
              </p>
            </div>

            <div className="p-8 bg-[#F6F8FA] rounded-2xl border border-[#16224E]/10 space-y-4 text-left">
              <h3 className="font-heading font-bold text-lg uppercase text-[#16224E]">
                Interested in a custom commute assessment for your organization?
              </h3>
              <p className="font-body text-sm text-[#16224E]/75 font-light leading-relaxed">
                We analyze employee distribution clusters, shift windows, and transit bottlenecks to provide data-driven route plans tailored to your facility.
              </p>
              <div className="pt-2">
                <Link href="/contact" className="btn-primary text-sm py-2.5 px-6">
                  Request a Commute Audit
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
