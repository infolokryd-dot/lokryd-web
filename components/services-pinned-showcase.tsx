"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface ServiceData {
  id: string;
  name: string;
  route: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  capabilities: string[];
}

const servicesList: ServiceData[] = [
  {
    id: "corporate-transportation",
    name: "Corporate Transportation",
    route: "/corporate-mobility",
    tagline: "Structured Workforce Logistics",
    description:
      "Daily employee pickup and drop-off rosters, corporate car rentals, and intercity business travel engineered for punctuality and zero administrative friction.",
    image: "/images/transport/sedan-fleet.jpg",
    imageAlt: "Fleet of white LOKRYD corporate sedans lined up for enterprise transport",
    capabilities: [
      "Daily employee pickup and drop rosters",
      "Route optimization & roster planning",
      "Corporate car rental & meeting transit",
      "Dedicated account management",
    ],
  },
  {
    id: "shuttle-services",
    name: "Shuttle Services",
    route: "/corporate-mobility",
    tagline: "High-Capacity Campus Mobility",
    description:
      "Scheduled commuter coaches, campus transit loops, and conference transfers delivering comfortable, punctual mass transit for enterprise tech parks and institutions.",
    image: "/images/transport/campus-fleet.jpg",
    imageAlt: "Dedicated LOKRYD passenger coach bus with driver for employee transit",
    capabilities: [
      "Fixed-route campus & tech park loops",
      "High-capacity passenger coaches",
      "Event and conference shuttle transit",
      "Structured schedule adherence",
    ],
  },
  {
    id: "executive-and-events",
    name: "Executive & Event Services",
    route: "/private-mobility",
    tagline: "Precision Chauffeur Transit",
    description:
      "Punctual airport transfers, discreet VIP chauffeur services, and luxury transportation for high-stakes meetings, delegations, and special occasions.",
    image: "/images/transport/airport-chauffeur.jpg",
    imageAlt: "Executive luxury sedan parked at entrance for private chauffeur and event travel",
    capabilities: [
      "Punctual, tracked airport transfers",
      "Executive sedan chauffeur service",
      "Delegation & conference logistics",
      "Quiet, Wi-Fi equipped cabins",
    ],
  },
];

export default function ServicesPinnedShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;

        if (totalScrollable <= 0) return;

        // Current scroll progress through the pinned container: 0 to 1
        const scrolledIntoSection = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolledIntoSection / totalScrollable));

        // 3 discrete steps: 0, 1, 2
        let step = 0;
        if (progress > 0.66) {
          step = 2;
        } else if (progress > 0.33) {
          step = 1;
        }
        setActiveStep(step);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const jumpToStep = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const targetOffset = index === 0 ? 0.1 : index === 1 ? 0.5 : 0.9;
    const targetY = window.scrollY + rect.top + targetOffset * totalScrollable;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const current = servicesList[activeStep];

  return (
    <>
      {/* DESKTOP PINNED SCROLL CONTAINER (md and above) */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full h-[300vh] bg-[#FFFFFF]"
      >
        {/* Sticky Viewport-Pinned Stage */}
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden px-8 lg:px-20 py-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Interactive Stepped Titles & Active Service Details */}
            <div className="col-span-6 flex flex-col justify-center space-y-8">
              {/* Top Section Header */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold">
                  Core Mobility Offerings
                </span>
                <p className="text-sm text-[#16224E]/60">
                  Scroll to explore our specialized transportation disciplines
                </p>
              </div>

              {/* Progress Indicator & Titles */}
              <div className="flex flex-col space-y-4 pt-2">
                {servicesList.map((svc, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => jumpToStep(idx)}
                      className="text-left group focus:outline-none transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <span
                          className={`font-mono text-sm tracking-widest transition-colors duration-300 ${
                            isActive
                              ? "text-[#1DAFC8] font-bold"
                              : "text-[#16224E]/30 group-hover:text-[#16224E]/60"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <h3
                          className={`font-heading uppercase tracking-tight transition-all duration-300 ${
                            isActive
                              ? "text-3xl lg:text-4xl font-black text-[#16224E] translate-x-1"
                              : "text-2xl lg:text-3xl font-bold text-[#16224E]/25 group-hover:text-[#16224E]/50"
                          }`}
                        >
                          {svc.name}
                        </h3>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Active Service Description & Details */}
              <div className="pt-4 border-t border-[#16224E]/10 space-y-5 min-h-[190px]">
                <div className="inline-block px-3 py-1 bg-[#1DAFC8]/10 text-[#1DAFC8] font-mono text-xs font-semibold uppercase tracking-wider rounded-full">
                  {current.tagline}
                </div>

                <p className="font-body text-[#16224E]/80 text-base lg:text-lg font-light leading-relaxed max-w-xl">
                  {current.description}
                </p>

                {/* Capabilities Chips */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {current.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-2 text-xs sm:text-sm text-[#16224E]/85 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href={current.route}
                    className="link-arrow text-[#211F5A] hover:text-[#1DAFC8] text-sm font-semibold group inline-flex items-center"
                  >
                    <span className="link-text">Explore {current.name}</span>
                    <span className="arrow-symbol text-[#1DAFC8] ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: High-Res Real Vehicle Photography Crossfade */}
            <div className="col-span-6 relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#16224E]/10 bg-[#16224E]">
              {servicesList.map((svc, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={svc.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={svc.image}
                      alt={svc.imageAlt}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 50vw, 45vw"
                      className="object-cover object-center transform transition-transform duration-1000 ease-out scale-100"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE ADAPTIVE VIEW (Stacked clean cards to prevent scroll trapping on narrow phones) */}
      <div className="md:hidden w-full bg-[#FFFFFF] py-14 px-6 space-y-12 border-b border-[#16224E]/10">
        <div className="space-y-2 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold">
            Core Mobility Solutions
          </span>
          <h2 className="font-heading font-black text-2xl uppercase text-[#16224E]">
            Specialized Services
          </h2>
        </div>

        <div className="space-y-12">
          {servicesList.map((svc, idx) => (
            <div
              key={svc.id}
              className="bg-[#F6F8FA] rounded-2xl overflow-hidden border border-[#16224E]/10 shadow-sm space-y-5 pb-6"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#16224E]">
                <Image
                  src={svc.image}
                  alt={svc.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="px-5 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#1DAFC8] font-semibold">
                  <span>0{idx + 1}</span>
                  <span>•</span>
                  <span>{svc.tagline}</span>
                </div>

                <h3 className="font-heading font-black text-xl uppercase text-[#16224E]">
                  {svc.name}
                </h3>

                <p className="font-body text-sm text-[#16224E]/80 leading-relaxed font-light">
                  {svc.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={svc.route}
                    className="btn-primary text-xs py-2 px-5 w-full text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
