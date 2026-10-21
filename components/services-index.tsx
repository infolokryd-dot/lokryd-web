"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/src/content/home";
import ScrollRevealText from "@/components/scroll-reveal-text";

export default function ServicesIndex() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const userInteractedRef = useRef(false);
  const scrollPosAtInteraction = useRef(0);

  const selectService = (index: number) => {
    setActiveServiceIndex(index);
    userInteractedRef.current = true;
    scrollPosAtInteraction.current = typeof window !== "undefined" ? window.scrollY : 0;
  };

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;

        if (userInteractedRef.current) {
          if (Math.abs(window.scrollY - scrollPosAtInteraction.current) > 75) {
            userInteractedRef.current = false;
          } else {
            return;
          }
        }

        const sectionEl = document.getElementById(homeContent.services.anchor);
        if (!sectionEl) return;

        const sRect = sectionEl.getBoundingClientRect();
        const vh = window.innerHeight;

        if (sRect.top > 0.05 * vh) {
          setActiveServiceIndex(0);
        } else if (sRect.top > -0.22 * vh) {
          setActiveServiceIndex(1);
        } else {
          setActiveServiceIndex(2);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id={homeContent.services.anchor}
      className="below-fold relative w-full bg-[#FFFFFF] py-20 sm:py-24 md:py-32 px-6 md:px-12 lg:px-20 scroll-mt-20 overflow-hidden"
    >
      {/* Background Watermark Numeral */}
      <div className="absolute top-12 right-12 lg:right-24 select-none pointer-events-none opacity-40">
        <span className="editorial-watermark text-[#16224E]/[0.05]">02</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 md:mb-20">
          <div className="reveal-init mb-3">
            <span className="editorial-eyebrow">
              <span>[ 02 ]</span>
              <span>MOBILITY SOLUTIONS</span>
            </span>
          </div>

          <h2 className="reveal-init font-heading font-black uppercase text-[clamp(2rem,4.2vw,4rem)] leading-[0.93] tracking-[-0.03em] text-[#16224E] mb-5">
            {homeContent.services.headline}
          </h2>

          <p className="reveal-init font-body text-[#16224E]/80 text-base sm:text-lg md:text-xl font-light leading-[1.55] max-w-xl">
            Precision fleet logistics, dedicated corporate routes, and discreet chauffeur services designed for continuous operational performance.
          </p>
        </div>

        {/* Desktop Editorial Index (Left text stack, right tall sticky image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Typographic Services Stack */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {homeContent.services.items.map((service, idx) => {
              const isActive = activeServiceIndex === idx;

              return (
                <div
                  key={service.id}
                  id={`service-item-${idx}`}
                  data-service-index={idx}
                  className="reveal-init hairline-b pb-6 pt-2"
                  tabIndex={0}
                  role="region"
                  aria-label={service.name}
                >
                  {/* Desktop Item Presentation */}
                  <div className="hidden lg:block">
                    <button
                      type="button"
                      onClick={() => selectService(idx)}
                      className="text-left w-full focus:outline-none cursor-pointer group py-2"
                      aria-expanded={isActive}
                      aria-controls={`service-content-desktop-${idx}`}
                    >
                      <div className="flex items-baseline justify-between">
                        <h3
                          className={`font-heading font-black uppercase text-2xl xl:text-3xl transition-colors duration-300 flex items-center ${
                            isActive
                              ? "text-[#16224E]"
                              : "text-[#16224E]/35 group-hover:text-[#16224E]/70"
                          }`}
                        >
                          <span className="font-mono text-xs text-[#1DAFC8] tracking-widest mr-4 font-bold">
                            0{idx + 1}
                          </span>
                          <span>{service.name}</span>
                        </h3>
                        <span className={`text-sm font-mono transition-transform duration-300 ${isActive ? "text-[#1DAFC8] translate-x-1" : "text-[#16224E]/20"}`}>
                          →
                        </span>
                      </div>
                    </button>

                    {/* Accordion Content Panel */}
                    <div
                      id={`service-content-desktop-${idx}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100 pointer-events-auto"
                          : "grid-rows-[0fr] opacity-0 pointer-events-none"
                      }`}
                      aria-hidden={!isActive}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-3 pb-2 space-y-4">
                          <p className="font-body text-base lg:text-[17px] text-[#16224E]/80 leading-relaxed max-w-xl">
                            {service.description}
                          </p>

                          <div className="pt-1">
                            <Link
                              href={service.actionHref}
                              className="link-arrow text-[15px] font-semibold text-[#16224E] group/link inline-flex items-center"
                            >
                              <span className="link-text">{service.actionText}</span>
                              <span className="arrow-symbol text-[#1DAFC8]">→</span>
                            </Link>
                          </div>

                          {/* Sub-links */}
                          <div className="pt-4 border-t border-[#16224E]/10">
                            <p className="font-mono text-[11px] uppercase tracking-wider text-[#16224E]/50 font-semibold mb-2.5">
                              DEPLOYED CONFIGURATIONS
                            </p>
                            <div className="flex flex-wrap gap-x-5 gap-y-2">
                              {service.subLinks.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  className="text-[13px] text-[#16224E]/75 hover:text-[#1DAFC8] transition-colors flex items-center gap-1 font-medium"
                                >
                                  <span>{sub.title}</span>
                                  <span className="text-[#1DAFC8]/60">↗</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Item Presentation: Visual Card with Dedicated Real Vehicle Image */}
                  <div className="lg:hidden">
                    <button
                      type="button"
                      onClick={() => selectService(idx)}
                      className="text-left w-full focus:outline-none cursor-pointer py-2"
                      aria-expanded={isActive}
                      aria-controls={`service-content-mobile-${idx}`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading font-black uppercase text-xl text-[#16224E] flex items-center">
                          <span className="font-mono text-xs text-[#1DAFC8] tracking-widest mr-3 font-bold">
                            0{idx + 1}
                          </span>
                          <span>{service.name}</span>
                        </h3>
                        <span className={`text-base font-mono transition-transform duration-300 ${isActive ? "text-[#1DAFC8] rotate-90" : "text-[#16224E]/40"}`}>
                          ↓
                        </span>
                      </div>
                    </button>

                    <div
                      id={`service-content-mobile-${idx}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-4 space-y-4">
                          <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#16224E]/5 border border-[#16224E]/10">
                            <Image
                              src={service.image}
                              alt={service.imageAlt}
                              fill
                              sizes="100vw"
                              className="object-cover"
                            />
                          </div>

                          <p className="font-body text-[15px] text-[#16224E]/80 leading-relaxed">
                            {service.description}
                          </p>

                          <div className="pt-1">
                            <Link
                              href={service.actionHref}
                              className="link-arrow text-sm font-semibold text-[#16224E]"
                            >
                              <span className="link-text">{service.actionText}</span>
                              <span className="arrow-symbol text-[#1DAFC8]">→</span>
                            </Link>
                          </div>

                          <div className="pt-3 border-t border-[#16224E]/10 flex flex-col space-y-2">
                            {service.subLinks.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="text-[13px] text-[#16224E]/75 hover:text-[#1DAFC8] transition-colors"
                              >
                                {sub.title} →
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Tall Sticky Image with Refined Crossfade */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="relative w-full h-[500px] xl:h-[540px] overflow-hidden bg-[#16224E] shadow-[0_24px_52px_rgba(22,34,78,0.12)] border border-[#16224E]/10 group/img">
              {homeContent.services.items.map((service, idx) => (
                <div
                  key={service.id}
                  className={`absolute inset-0 transition-opacity duration-[850ms] ease-in-out ${
                    activeServiceIndex === idx
                      ? "opacity-100 z-10 pointer-events-auto"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      priority={idx === 0}
                      sizes="45vw"
                      className="object-cover transition-transform duration-[700ms] ease-out group-hover/img:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16224E]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-white font-mono">
                      <span className="tracking-widest uppercase">{service.name}</span>
                      <span className="text-[#1DAFC8]">ACTIVE FLEET</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mass Transit Solutions — architectural callout */}
        <div className="mt-20 sm:mt-24 pt-12 hairline-t grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <span className="editorial-eyebrow mb-2">
              <span>[ SCALE ]</span>
              <span>MASS TRANSIT INFRASTRUCTURE</span>
            </span>
            <ScrollRevealText
              as="h3"
              className="font-heading font-black uppercase text-2xl sm:text-3xl text-[#16224E] tracking-tight leading-tight"
            >
              {homeContent.services.massTransit.headline}
            </ScrollRevealText>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <p className="reveal-init font-body text-[#16224E]/80 text-base sm:text-lg leading-relaxed font-light">
              {homeContent.services.massTransit.intro}
            </p>
            <ul className="reveal-init space-y-2.5">
              {homeContent.services.massTransit.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1DAFC8] shrink-0" />
                  <span className="font-body text-[#16224E]/80 text-[15px] leading-relaxed">{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
