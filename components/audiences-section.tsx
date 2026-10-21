"use client";

import Image from "next/image";
import Link from "next/link";

export default function AudiencesSection() {
  return (
    <section
      id="audiences"
      className="relative w-full bg-[#FFFFFF] py-20 sm:py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden border-b border-[#16224E]/08"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 md:mb-24">
          <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block mb-3">
            Two Pathways to Premium Mobility
          </span>

          <h2 className="font-heading font-black uppercase text-[clamp(2rem,4vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-[#16224E] mb-5">
            Engineered For Workforces & Private Travelers
          </h2>

          <p className="font-body text-[#16224E]/80 text-base sm:text-lg md:text-xl font-light leading-[1.55] max-w-2xl">
            Whether organizing daily transportation for thousands of corporate employees or delivering discreet chauffeur transit for executives, LOKRYD combines operational discipline with passenger comfort.
          </p>
        </div>

        {/* Dual Mobility Pathways */}
        <div className="space-y-20 sm:space-y-24 md:space-y-32">
          {/* Pathway 1: Corporate Mobility (For Organizations) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Real Vehicle Fleet Photography */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-[#16224E]/5 shadow-xl border border-[#16224E]/10 group">
                <Image
                  src="/images/transport/campus-fleet.jpg"
                  alt="LOKRYD corporate mobility fleet lined up at enterprise technology campus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={false}
                />
              </div>
            </div>

            {/* Content & Action */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#1DAFC8] tracking-widest uppercase font-semibold">
                  For Organizations
                </span>
                <h3 className="font-heading font-black uppercase text-2xl sm:text-3xl lg:text-4xl text-[#16224E] leading-tight tracking-tight">
                  Corporate Mobility Solutions
                </h3>
              </div>

              <p className="font-body text-[#16224E]/75 text-base sm:text-lg leading-relaxed font-light">
                Structured employee pickup and drop rosters, tech park campus shuttles, and corporate car rentals with route optimization and verified drivers.
              </p>

              <div className="space-y-3 border-t border-[#16224E]/10 pt-4 text-sm text-[#16224E]/85">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                  <span>High-volume employee daily commute rosters</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                  <span>MNC & tech park campus shuttle systems</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                  <span>Central route planning & monthly billing</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/corporate-mobility"
                  className="btn-primary text-sm py-2.5 px-6 inline-flex"
                >
                  Explore Corporate Mobility
                </Link>
              </div>
            </div>
          </div>

          {/* Pathway 2: Private Mobility (For Individuals & Executives) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Content & Action Left on Desktop */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#1DAFC8] tracking-widest uppercase font-semibold">
                  For Individuals & Executives
                </span>
                <h3 className="font-heading font-black uppercase text-2xl sm:text-3xl lg:text-4xl text-[#16224E] leading-tight tracking-tight">
                  Private Chauffeur Mobility
                </h3>
              </div>

              <p className="font-body text-[#16224E]/75 text-base sm:text-lg leading-relaxed font-light">
                Discreet airport transfers, intercity and outstation journeys, and executive car services designed for calm, focus, and absolute punctuality.
              </p>

              <div className="space-y-3 border-t border-[#16224E]/10 pt-4 text-sm text-[#16224E]/85">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                  <span>Punctual airport pick-up & drop with flight tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                  <span>Comfortable intercity & outstation executive travel</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                  <span>Sanitized vehicles with Wi-Fi cabin environments</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/private-mobility"
                  className="btn-primary text-sm py-2.5 px-6 inline-flex"
                >
                  Explore Private Mobility
                </Link>
              </div>
            </div>

            {/* Real Vehicle Photography Right (replaces any glitched/corrupted image!) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-[#16224E]/5 shadow-xl border border-[#16224E]/10 group">
                <Image
                  src="/images/transport/executive-passenger.jpg"
                  alt="Executive passenger relaxing in quiet rear cabin of premium LOKRYD vehicle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
