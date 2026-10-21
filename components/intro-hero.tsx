"use client";

import Image from "next/image";
import Link from "next/link";

export default function IntroHero() {
  return (
    <section
      data-theme="dark"
      className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-end overflow-hidden bg-[#0A1020]"
    >
      {/* 1. Exact City Motion Background: Dusk Skyline, Sunset Glow, Giant Translucent LOKRYD Wordmark & Mercedes S-Class Sedan */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/city-motion-v2.jpg"
          alt="LOKRYD City Motion — Dusk urban skyline with embedded architectural wordmark and executive luxury sedan"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.01]"
        />

        {/* Top Scrim for Navbar Contrast */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A1224]/75 via-[#0A1224]/25 to-transparent pointer-events-none" />

        {/* Bottom Blend to Page Canvas */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A1020]/30 to-transparent pointer-events-none" />
      </div>

      {/* 2. Hero Foreground Content Grid: Left 3-Line Headline + Right Vertical Border, Supporting Text & White Pill CTA */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20 pt-36 sm:pt-44 lg:pt-48 pb-14 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Column: Exactly Matching Reference Typography */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <h1 className="font-heading font-black uppercase text-[clamp(2.75rem,5.8vw,5.5rem)] leading-[0.92] tracking-[-0.035em] text-white">
              <span className="block">MOVE WITH</span>
              <span className="block text-[#38BDF8]">PURPOSE.</span>
            </h1>
            <p className="font-heading uppercase tracking-[0.22em] sm:tracking-[0.25em] text-xs sm:text-sm md:text-base font-medium text-white/90">
              JOURNEYS WITH PRECISION.
            </p>
          </div>

          {/* Right Column: Vertical Left Divider Line, Concise Supporting Copy, and Solid White Pill CTA */}
          <div className="lg:col-span-5 border-l border-white/20 pl-6 sm:pl-8 space-y-5 lg:space-y-6 lg:pb-1">
            <p className="font-body text-white/90 text-sm sm:text-base font-light leading-relaxed max-w-md">
              Premium mobility solutions for businesses and individuals. From daily commutes to special journeys, we deliver safe, reliable and comfortable experiences.
            </p>

            <div>
              <Link
                href="/services"
                className="inline-flex items-center justify-center bg-[#FFFFFF] text-[#16224E] hover:bg-white/90 font-semibold text-sm sm:text-base px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all group"
              >
                <span>Explore Our Services</span>
                <span className="ml-2.5 font-bold group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
