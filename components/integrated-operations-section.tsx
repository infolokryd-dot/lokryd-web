"use client";

import Image from "next/image";
import Link from "next/link";

export default function IntegratedOperationsSection() {
  return (
    <section
      id="operations"
      data-theme="dark"
      className="relative w-full bg-[#16224E] text-white py-20 sm:py-24 md:py-32 px-6 md:px-12 lg:px-20 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 md:mb-24">
          <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block mb-3">
            Operating Principles
          </span>

          <h2 className="font-heading font-black uppercase text-[clamp(2.25rem,4.5vw,4rem)] text-white tracking-[-0.03em] leading-[0.93] mb-6">
            Safety, Reliability & Fleet Discipline
          </h2>

          <p className="font-body text-white/80 text-base sm:text-lg md:text-xl font-light leading-[1.55] max-w-xl">
            Every vehicle is inspected regularly, tracked in real time via telematics, and operated by verified professional drivers.
          </p>
        </div>

        {/* 3 Substantiated Operational Pillars (strictly grounded in verified company profiles) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {/* Pillar 1: Preventative Vehicle Maintenance */}
          <div className="flex flex-col bg-white/[0.04] border border-white/10 p-6 sm:p-8 rounded-xl hover:bg-white/[0.07] transition-colors duration-300">
            <div className="relative w-full aspect-[16/10] overflow-hidden mb-6 rounded-lg bg-black/40 border border-white/10">
              <Image
                src="/images/transport/maintenance-bay.jpg"
                alt="Hydraulic vehicle lift and preventative vehicle maintenance bay"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-[#1DAFC8] tracking-widest font-semibold uppercase">
                Fleet Care
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">
                Regular Maintenance & Safety Inspections
              </h3>
              <p className="font-body text-white/75 text-[15px] leading-relaxed pt-1">
                Scheduled vehicle servicing, tyre and brake safety checks, and vehicle sanitization ensure each journey is dependable and clean.
              </p>
            </div>
          </div>

          {/* Pillar 2: Verified Drivers */}
          <div className="flex flex-col bg-white/[0.04] border border-white/10 p-6 sm:p-8 rounded-xl hover:bg-white/[0.07] transition-colors duration-300">
            <div className="relative w-full aspect-[16/10] overflow-hidden mb-6 rounded-lg bg-black/40 border border-white/10">
              <Image
                src="/images/transport/chauffeur-portrait.jpg"
                alt="Professional corporate chauffeur in uniform"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top"
              />
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-[#1DAFC8] tracking-widest font-semibold uppercase">
                Chauffeur Standards
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">
                Driver Verification & Professional Training
              </h3>
              <p className="font-body text-white/75 text-[15px] leading-relaxed pt-1">
                Thorough background verification, defensive driving skills, and customer hospitality standards protect every passenger.
              </p>
            </div>
          </div>

          {/* Pillar 3: GPS Fleet Tracking & Telematics */}
          <div className="flex flex-col bg-white/[0.04] border border-white/10 p-6 sm:p-8 rounded-xl hover:bg-white/[0.07] transition-colors duration-300">
            <div className="relative w-full aspect-[16/10] overflow-hidden mb-6 rounded-lg bg-black/40 border border-white/10">
              <Image
                src="/images/transport/sedan-fleet.jpg"
                alt="LOKRYD corporate sedan fleet prepared for route deployment"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-[#1DAFC8] tracking-widest font-semibold uppercase">
                Route Tracking
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">
                Real-Time GPS & Telematics
              </h3>
              <p className="font-body text-white/75 text-[15px] leading-relaxed pt-1">
                Continuous GPS vehicle monitoring and route optimization provide punctuality, route visibility, and structured reporting.
              </p>
            </div>
          </div>
        </div>

        {/* View Detailed Operations Page Link */}
        <div className="mt-12 text-center">
          <Link
            href="/operations-safety"
            className="link-arrow text-white/90 hover:text-[#1DAFC8] text-base font-semibold group inline-flex items-center"
          >
            <span className="link-text">Read Our Full Operations & Safety Practices</span>
            <span className="arrow-symbol text-[#1DAFC8] ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
