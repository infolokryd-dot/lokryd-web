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

  // Scroll-based single-open service selection
  // Natural bi-directional flow: 01 -> 02 -> 03 when scrolling down, 03 -> 02 -> 01 when scrolling up
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;

        // If user explicitly clicked/tapped recently, maintain that selection
        // until they scroll noticeably (> 75px)
        if (userInteractedRef.current) {
          if (Math.abs(window.scrollY - scrollPosAtInteraction.current) > 75) {
            userInteractedRef.current = false;
          } else {
            return;
          }
        }

        // Section-relative scroll tracking (completely immune to layout shift from expanding/collapsing items)
        const sectionEl = document.getElementById(homeContent.services.anchor);
        if (!sectionEl) return;

        const sRect = sectionEl.getBoundingClientRect();
        const vh = window.innerHeight;

        // Earlier scroll activation so the next service becomes active earlier
        // and Service 03 activates when relevant content reaches middle/upper-middle viewport
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
      className="below-fold relative w-full bg-[#FFFFFF] py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-20 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <div className="max-w-3xl mb-12 sm:mb-14 md:mb-16">
          <ScrollRevealText
            as="h2"
            className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#16224E] tracking-tight"
          >
            {homeContent.services.headline}
          </ScrollRevealText>
        </div>

        {/* Desktop Editorial Index (Left text stack, right tall sticky image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Typographic Services Stack */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8">
            {homeContent.services.items.map((service, idx) => {
              const isActive = activeServiceIndex === idx;

              return (
                <div
                  key={service.id}
                  id={`service-item-${idx}`}
                  data-service-index={idx}
                  className="reveal-init"
                  tabIndex={0}
                  role="region"
                  aria-label={service.name}
                >
                  {/* Desktop Item Presentation */}
                  <div className="hidden lg:block">
                    <button
                      type="button"
                      onClick={() => selectService(idx)}
                      className="text-left w-full focus:outline-none cursor-pointer group py-1"
                      aria-expanded={isActive}
                      aria-controls={`service-content-desktop-${idx}`}
                    >
                      <h3
                        className={`font-heading font-semibold text-3xl xl:text-4xl transition-colors duration-300 flex items-center ${
                          isActive
                            ? "text-[#16224E]"
                            : "text-[#16224E]/40 group-hover:text-[#16224E]/75"
                        }`}
                      >
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full border text-xs sm:text-sm font-body font-medium mr-3.5 transition-colors duration-300 shrink-0 [font-feature-settings:normal] ${
                            isActive
                              ? "border-[#16224E] text-[#16224E]"
                              : "border-[#16224E]/25 text-[#16224E]/50 group-hover:border-[#16224E]/50 group-hover:text-[#16224E]/75"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span>{service.name}</span>
                      </h3>
                    </button>

                    {/* Accordion Content Panel (Fully collapses and releases layout height when inactive) */}
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
                        <div className="pt-4 space-y-4">
                          <p className="font-body text-base lg:text-lg text-[#16224E]/85 leading-relaxed max-w-xl">
                            {service.description}
                          </p>

                          <div className="pt-1">
                            <Link
                              href={service.actionHref}
                              className="link-arrow text-base font-medium text-[#16224E] group/link inline-flex items-center"
                            >
                              <span className="link-text">{service.actionText}</span>
                              <span className="arrow-symbol text-[#1DAFC8]">→</span>
                            </Link>
                          </div>

                          {/* Sub-links (Inside the active panel) */}
                          <div className="pt-4 border-t border-[#16224E]/10">
                            <p className="text-xs uppercase tracking-wider text-[#16224E]/50 font-medium mb-2.5">
                              Available Specializations
                            </p>
                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                              {service.subLinks.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  className="text-sm text-[#16224E]/75 hover:text-[#1DAFC8] transition-colors underline-offset-4 hover:underline"
                                >
                                  {sub.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile & Tablet Accordion Presentation */}
                  <div className="lg:hidden border-b border-[#16224E]/10 pb-5 pt-2 first:pt-0">
                    <button
                      type="button"
                      onClick={() => selectService(idx)}
                      className="w-full text-left flex items-center justify-between py-2 focus:outline-none cursor-pointer group"
                      aria-expanded={isActive}
                      aria-controls={`service-content-mobile-${idx}`}
                    >
                      <h3
                        className={`font-heading font-semibold text-2xl flex items-center transition-colors duration-300 ${
                          isActive
                            ? "text-[#16224E]"
                            : "text-[#16224E]/50 group-hover:text-[#16224E]/80"
                        }`}
                      >
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-full border text-xs font-body font-medium mr-3 transition-colors duration-300 shrink-0 [font-feature-settings:normal] ${
                            isActive
                              ? "border-[#16224E] text-[#16224E]"
                              : "border-[#16224E]/25 text-[#16224E]/50 group-hover:border-[#16224E]/50 group-hover:text-[#16224E]/75"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span>{service.name}</span>
                      </h3>
                      <span className="text-2xl text-[#1DAFC8] ml-4 transition-transform duration-200">
                        {isActive ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      id={`service-content-mobile-${idx}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100 pointer-events-auto"
                          : "grid-rows-[0fr] opacity-0 pointer-events-none"
                      }`}
                      aria-hidden={!isActive}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-2 space-y-4">
                          {/* Inline Mobile Image with Subtle Scale */}
                          <div className="relative w-full aspect-video overflow-hidden my-3 bg-[#16224E]/10 rounded-lg group/mob">
                            <Image
                              src={service.image}
                              alt={service.imageAlt}
                              fill
                              priority={true}
                              sizes="100vw"
                              className="object-cover transition-transform duration-[600ms] ease-out group-hover/mob:scale-[1.035]"
                            />
                          </div>

                          <p className="font-body text-base text-[#16224E]/85 leading-relaxed">
                            {service.description}
                          </p>

                          <div>
                            <Link
                              href={service.actionHref}
                              className="link-arrow text-base font-medium text-[#16224E]"
                            >
                              <span className="link-text">{service.actionText}</span>
                              <span className="arrow-symbol text-[#1DAFC8]">→</span>
                            </Link>
                          </div>

                          {/* Mobile Sub-links */}
                          <div className="pt-3 border-t border-[#16224E]/10 flex flex-col space-y-2">
                            {service.subLinks.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="text-sm text-[#16224E]/75 hover:text-[#1DAFC8] transition-colors"
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

          {/* Right Column: Tall Sticky Image with Refined 850ms Crossfade & 1.035 Hover Scale */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="relative w-full h-[480px] xl:h-[520px] rounded-xl overflow-hidden bg-[#16224E] shadow-[0_16px_40px_rgba(22,34,78,0.08)] hover:shadow-[0_24px_50px_rgba(22,34,78,0.14)] transition-shadow duration-[600ms] ease-out">
              {homeContent.services.items.map((service, idx) => (
                <div
                  key={service.id}
                  className={`absolute inset-0 transition-opacity duration-[850ms] ease-in-out ${
                    activeServiceIndex === idx
                      ? "opacity-100 z-10 pointer-events-auto"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <div className="relative w-full h-full overflow-hidden group/img cursor-pointer">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      priority={true}
                      sizes="45vw"
                      className="object-cover transition-transform duration-[600ms] ease-out group-hover/img:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16224E]/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fine hairline separating the list from what follows */}
        <div className="mt-14 sm:mt-18 w-full h-[1px] bg-[#16224E]/15" />

        {/* Mass Transit Solutions — editorial editorial block */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold mb-4">
              Large-Scale Capability
            </p>
            <ScrollRevealText
              as="h3"
              className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#16224E] tracking-tight leading-tight"
            >
              {homeContent.services.massTransit.headline}
            </ScrollRevealText>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <p className="reveal-init font-body text-[#16224E]/85 text-base sm:text-lg leading-relaxed">
              {homeContent.services.massTransit.intro}
            </p>
            <ul className="reveal-init space-y-3">
              {homeContent.services.massTransit.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3">
                  <span className="mt-1.5 w-[5px] h-[5px] rounded-full bg-[#1DAFC8] shrink-0" />
                  <span className="font-body text-[#16224E]/80 text-[15px] sm:text-base leading-relaxed">{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
