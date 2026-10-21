import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import IntroHero from "@/components/intro-hero";
import ClientsSection from "@/components/clients-section";
import AudiencesSection from "@/components/audiences-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#16224E]">
      {/* Fully Transparent Fixed Navigation */}
      <Navbar />

      <main id="main-content">
        {/* 1. Cinematic Vehicle-Driven Hero with 3-Line Headline */}
        <IntroHero />

        {/* 2. Client Showcase — User-Controlled Drag Strip */}
        <ClientsSection />

        {/* 3. Dual Mobility Channels — Corporate & Private Mobility Entry Points */}
        <AudiencesSection />

        {/* 4. Curated Services Overview */}
        <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-[#16224E]/08">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                  Ground Mobility Services
                </span>
                <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl lg:text-5xl text-[#16224E] tracking-tight leading-tight">
                  Tailored For Every Transit Requirement
                </h2>
                <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
                  Explore our dedicated mobility categories engineered for enterprise workforces, high-capacity campus shuttles, and private executive travel.
                </p>
              </div>

              <div>
                <Link
                  href="/services"
                  className="btn-primary text-sm py-3 px-7 shrink-0 inline-flex items-center"
                >
                  <span>Explore Interactive Services</span>
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            {/* 3 Editorial Service Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group rounded-2xl overflow-hidden border border-[#16224E]/10 bg-[#F6F8FA] hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#16224E]">
                  <Image
                    src="/images/transport/innova-fleet.jpg"
                    alt="Corporate transportation vehicle fleet"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase text-[#1DAFC8] font-semibold">
                      Enterprise Rosters
                    </span>
                    <h3 className="font-heading font-bold uppercase text-xl text-[#16224E]">
                      Corporate Transportation
                    </h3>
                    <p className="font-body text-sm text-[#16224E]/75 font-light leading-relaxed">
                      Structured employee transportation with dedicated routes, verified drivers, and regular maintenance for punctuality.
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/corporate-mobility"
                      className="link-arrow text-sm font-semibold text-[#211F5A] hover:text-[#1DAFC8]"
                    >
                      <span className="link-text">Learn More</span>
                      <span className="arrow-symbol text-[#1DAFC8]">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group rounded-2xl overflow-hidden border border-[#16224E]/10 bg-[#F6F8FA] hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#16224E]">
                  <Image
                    src="/images/transport/employee-transit.jpg"
                    alt="Shuttle transit coach for corporate staff"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase text-[#1DAFC8] font-semibold">
                      High-Capacity Transit
                    </span>
                    <h3 className="font-heading font-bold uppercase text-xl text-[#16224E]">
                      Shuttle Services
                    </h3>
                    <p className="font-body text-sm text-[#16224E]/75 font-light leading-relaxed">
                      Scalable mass transit for tech parks, university campuses, and corporate events with flexible scheduling.
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/corporate-mobility"
                      className="link-arrow text-sm font-semibold text-[#211F5A] hover:text-[#1DAFC8]"
                    >
                      <span className="link-text">Learn More</span>
                      <span className="arrow-symbol text-[#1DAFC8]">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group rounded-2xl overflow-hidden border border-[#16224E]/10 bg-[#F6F8FA] hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#16224E]">
                  <Image
                    src="/images/transport/airport-chauffeur.jpg"
                    alt="Executive airport transfer chauffeur"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase text-[#1DAFC8] font-semibold">
                      Private Chauffeur
                    </span>
                    <h3 className="font-heading font-bold uppercase text-xl text-[#16224E]">
                      Executive & Events
                    </h3>
                    <p className="font-body text-sm text-[#16224E]/75 font-light leading-relaxed">
                      Punctual airport transfers, VIP corporate car rentals, and quiet Wi-Fi cabins for executive focus.
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/private-mobility"
                      className="link-arrow text-sm font-semibold text-[#211F5A] hover:text-[#1DAFC8]"
                    >
                      <span className="link-text">Learn More</span>
                      <span className="arrow-symbol text-[#1DAFC8]">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. The LOKRYD Standard & Operational Principles Teaser */}
        <section className="relative w-full bg-[#16224E] text-white py-20 sm:py-24 md:py-28 px-6 md:px-12 lg:px-20 overflow-hidden" data-theme="dark">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                The LOKRYD Philosophy
              </span>
              <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
                Operating Discipline Over Unpredictability
              </h2>
              <p className="font-body text-white/80 text-base sm:text-lg font-light leading-relaxed">
                We believe business transit should be calm, punctual, and safe. Through verified chauffeurs, regular preventative fleet maintenance, and real-time GPS route tracking, we deliver ground mobility you can trust every day.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/the-standard"
                  className="btn-primary text-sm py-3 px-6 shadow-md"
                >
                  The LOKRYD Standard
                </Link>
                <Link
                  href="/operations-safety"
                  className="link-arrow text-white/90 hover:text-[#1DAFC8] text-sm font-medium py-3"
                >
                  <span className="link-text">Operations & Safety</span>
                  <span className="arrow-symbol text-[#1DAFC8] ml-2">→</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/transport/sedan-fleet.jpg"
                  alt="LOKRYD corporate sedan fleet"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Direct Contact CTA Strip */}
        <section className="relative w-full bg-[#FFFFFF] py-16 sm:py-20 px-6 md:px-12 lg:px-20 text-center border-t border-[#16224E]/08">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
              Initiate Contact
            </span>
            <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl text-[#16224E] tracking-tight">
              Ready to Upgrade Your Ground Mobility?
            </h2>
            <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
              Connect with our operations team for custom employee commute planning, fleet rental quotes, or executive chauffeur enquiries.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary text-base py-3 px-8 shadow-md"
              >
                Contact Us
              </Link>
              <a
                href="tel:+917997225599"
                className="btn-primary text-base py-3 px-8 bg-transparent text-[#16224E] border border-[#16224E]/20 hover:bg-[#16224E]/05 shadow-none"
              >
                Call +91 79972 25599
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
