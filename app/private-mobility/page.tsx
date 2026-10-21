import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Private Mobility & Executive Chauffeur | LOKRYD",
  description:
    "Premium executive chauffeur services, airport transfers, intercity travel, and private vehicle rentals engineered for comfort and precision.",
  alternates: {
    canonical: "/private-mobility",
  },
};

export default function PrivateMobilityPage() {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#16224E]">
      <Navbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative w-full bg-[#16224E] text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 md:px-12 lg:px-20 overflow-hidden" data-theme="dark">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                Executive & Private Travel
              </span>
              <h1 className="font-heading font-black uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
                Private Chauffeur & Executive Mobility
              </h1>
              <p className="font-body text-white/85 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                Airport transfers, outstation business journeys, and discreet chauffeur services designed for professionals who value punctuality, serenity, and focus.
              </p>
              <div className="pt-2">
                <Link href="/contact" className="btn-primary text-base py-3 px-8">
                  Book a Private Chauffeur
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                <Image
                  src="/images/transport/airport-chauffeur.jpg"
                  alt="Professional chauffeur assisting executive traveler at airport"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Private Capabilities Grid */}
        <section className="py-20 sm:py-28 px-6 md:px-12 lg:px-20 bg-[#FFFFFF] border-b border-[#16224E]/08">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                Tailored Journeys
              </span>
              <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl text-[#16224E]">
                Personalized Mobility For Demanding Schedules
              </h2>
              <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
                Whether traveling between cities or heading to an early morning flight, experience a quiet, sanitized cabin tailored for work or relaxation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-[#F6F8FA] p-8 rounded-2xl border border-[#16224E]/10 space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#16224E]">
                  <Image
                    src="/images/transport/airport-chauffeur.jpg"
                    alt="Punctual airport transfers with flight tracking"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl uppercase text-[#16224E]">
                  Punctual Airport Transfers
                </h3>
                <p className="font-body text-sm text-[#16224E]/75 font-light leading-relaxed">
                  Real-time flight tracking, timely terminal drop-offs, and seamless meet-and-greet pickups that take the anxiety out of flying.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#F6F8FA] p-8 rounded-2xl border border-[#16224E]/10 space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#16224E]">
                  <Image
                    src="/images/transport/executive-passenger.jpg"
                    alt="Executive passenger relaxing in rear cabin"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl uppercase text-[#16224E]">
                  Intercity & Outstation Travel
                </h3>
                <p className="font-body text-sm text-[#16224E]/75 font-light leading-relaxed">
                  Comfortable, uninterrupted journeys connecting Hyderabad with regional economic centers, client facilities, and project sites.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#F6F8FA] p-8 rounded-2xl border border-[#16224E]/10 space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#16224E]">
                  <Image
                    src="/images/transport/hero-executive.jpg"
                    alt="Executive sedan chauffeur service"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl uppercase text-[#16224E]">
                  VIP & Delegation Logistics
                </h3>
                <p className="font-body text-sm text-[#16224E]/75 font-light leading-relaxed">
                  High-touch chauffeur mobility for corporate board meetings, international delegates, conference speaker transit, and special occasions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Office on Wheels Experience */}
        <section className="py-20 sm:py-28 px-6 md:px-12 lg:px-20 bg-[#16224E] text-white" data-theme="dark">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                The In-Cabin Experience
              </span>
              <h2 className="font-heading font-black uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                An Office On Wheels
              </h2>
              <blockquote className="border-l-2 border-[#1DAFC8] pl-6 py-1 font-body text-white/90 text-lg sm:text-xl font-light italic">
                “Wi-Fi-enabled, quiet cabins designed to turn commute time into work time — or time to unwind.”
              </blockquote>
              <p className="font-body text-white/80 text-base leading-relaxed font-light">
                Every LOKRYD journey is engineered for focus and calm, giving passengers the freedom to prepare for critical meetings or rest before arrival.
              </p>
              <div className="pt-2">
                <Link href="/contact" className="btn-primary text-base py-3 px-8">
                  Plan Your Private Journey
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/transport/executive-passenger.jpg"
                  alt="Executive passenger in calm vehicle cabin"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
