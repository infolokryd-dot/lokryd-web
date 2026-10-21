"use client";

import Link from "next/link";
import { homeContent } from "@/src/content/home";

export default function StandardsSection() {
  const { headline, rows } = homeContent.standards;

  return (
    <section
      id="standards"
      className="relative w-full bg-[#F6F8FA] py-20 sm:py-24 md:py-32 px-6 md:px-12 lg:px-20 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-14 sm:mb-16 md:mb-20 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block mb-3">
            Service Philosophy
          </span>
          <h2 className="font-heading font-black uppercase text-[clamp(2rem,4vw,3.75rem)] text-[#16224E] tracking-tight leading-[0.95]">
            {headline}
          </h2>
          <p className="font-body text-[#16224E]/75 text-base sm:text-lg mt-4 max-w-xl font-light leading-relaxed">
            Eliminating operational friction through fleet discipline, verified chauffeurs, and structured service commitments.
          </p>
        </div>

        {/* Editorial rows */}
        <div className="space-y-0 border-t border-[#16224E]/10">
          {rows.map((row) => (
            <div
              key={row.before}
              className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-8 sm:py-9 border-b border-[#16224E]/10 items-start"
            >
              {/* Conventional Status Quo */}
              <div className="md:col-span-5 space-y-1">
                <span className="font-mono text-[11px] text-[#16224E]/40 tracking-wider uppercase font-semibold">
                  Conventional Transport
                </span>
                <p className="font-heading font-bold text-lg sm:text-xl text-[#16224E]/40 line-through decoration-[#16224E]/20">
                  {row.before}
                </p>
                <p className="font-body text-[#16224E]/55 text-sm leading-relaxed">
                  {row.beforeDetail}
                </p>
              </div>

              {/* Transition Indicator */}
              <div className="md:col-span-2 flex items-center justify-start md:justify-center pt-2 md:pt-4">
                <span className="text-[#1DAFC8] font-mono text-xl font-bold select-none" aria-hidden="true">
                  →
                </span>
              </div>

              {/* The LOKRYD Standard */}
              <div className="md:col-span-5 space-y-1">
                <span className="font-mono text-[11px] text-[#1DAFC8] tracking-wider uppercase font-semibold">
                  The LOKRYD Standard
                </span>
                <p className="font-heading font-black uppercase text-xl sm:text-2xl text-[#16224E] tracking-tight">
                  {row.after}
                </p>
                <p className="font-body text-[#16224E]/80 text-[15px] leading-relaxed">
                  {row.afterDetail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Standards Page Link */}
        <div className="mt-12 text-center">
          <Link
            href="/the-standard"
            className="link-arrow text-[#211F5A] hover:text-[#1DAFC8] text-base font-semibold group inline-flex items-center"
          >
            <span className="link-text">Explore The Full LOKRYD Standard</span>
            <span className="arrow-symbol text-[#1DAFC8] ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
