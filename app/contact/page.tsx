import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import EnquirySection from "@/components/enquiry-section";

export const metadata: Metadata = {
  title: "Contact Us | Corporate Transit Enquiries | LOKRYD",
  description:
    "Connect with LOKRYD operations team for corporate employee transportation, car rentals, and executive chauffeur services. Email: info.lokryd@gmail.com, Phone: +91 79972 25599.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#16224E]">
      <Navbar />

      <main id="main-content">
        {/* Editorial Contact Page Header */}
        <section className="relative w-full bg-[#16224E] text-white pt-40 pb-16 sm:pt-48 sm:pb-24 px-6 md:px-12 lg:px-20 overflow-hidden" data-theme="dark">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
              Fleet Operations Desk
            </span>
            <h1 className="font-heading font-black uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
              Contact LOKRYD
            </h1>
            <p className="font-body text-white/85 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Initiate corporate employee transit contracts, schedule executive chauffeur services, or discuss customized route operations across Telangana.
            </p>
          </div>
        </section>

        {/* Working Supabase Contact Form & Official Channels */}
        <EnquirySection />
      </main>

      <Footer />
    </div>
  );
}
