"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { homeContent } from "@/src/content/home";

interface IntroHeroProps {
  onPreselectInquiry?: (type: string) => void;
}

export default function IntroHero({ onPreselectInquiry }: IntroHeroProps) {
  const [introVisible, setIntroVisible] = useState(false);
  const [introFadingOut, setIntroFadingOut] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const completeIntro = () => {
    try {
      sessionStorage.setItem("lokryd_intro_seen", "true");
    } catch {
      // Ignore storage restrictions
    }
    setIntroFadingOut(true);
    setTimeout(() => {
      setIntroVisible(false);
    }, 700);
  };

  useEffect(() => {
    // 1. Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    // 2. Check if already seen in this session
    try {
      const seen = sessionStorage.getItem("lokryd_intro_seen");
      if (seen) {
        return;
      }
    } catch {
      // Storage unavailable, proceed to check
    }

    // 3. User hasn't seen intro: display overlay
    const introInitTimer = setTimeout(() => {
      setIntroVisible(true);
    }, 10);

    // Skip control appears after 1 second
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    // Absolute maximum intro duration 10 seconds
    safetyTimeoutRef.current = setTimeout(() => {
      completeIntro();
    }, homeContent.intro.maxDurationSeconds * 1000);

    // Fallback: If video does not start within 2 seconds, skip immediately
    playTimeoutRef.current = setTimeout(() => {
      const vid = videoRef.current;
      if (!vid || vid.paused || vid.currentTime === 0) {
        completeIntro();
      }
    }, 2000);

    return () => {
      clearTimeout(introInitTimer);
      clearTimeout(skipTimer);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
    };
  }, []);

  const handleVideoEnded = () => {
    completeIntro();
  };

  const handleVideoError = () => {
    completeIntro();
  };

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onPreselectInquiry) {
      onPreselectInquiry(homeContent.hero.secondaryButton.preselectType);
    } else {
      window.dispatchEvent(
        new CustomEvent("lokryd:select-inquiry", {
          detail: { inquiryType: homeContent.hero.secondaryButton.preselectType },
        })
      );
    }
    const enquiryEl = document.getElementById("enquiry");
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] max-h-[900px] flex flex-col justify-end overflow-hidden bg-[#16224E]">
      {/* Intro Video Overlay */}
      {introVisible && (
        <div
          className={`fixed inset-0 z-50 bg-[#16224E] flex items-center justify-center transition-opacity duration-700 ease-out ${
            introFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-hidden={introFadingOut}
        >
          <video
            ref={videoRef}
            src={homeContent.intro.videoSrc}
            poster={homeContent.intro.posterSrc}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            className="w-full h-full object-cover"
          />

          {showSkip && (
            <button
              type="button"
              onClick={completeIntro}
              className="absolute top-8 right-8 z-10 px-4 py-1.5 text-xs tracking-widest uppercase font-mono text-white/90 hover:text-white bg-black/50 hover:bg-black/75 backdrop-blur-md rounded-full border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#1DAFC8]"
            >
              {homeContent.intro.skipButtonText}
            </button>
          )}
        </div>
      )}

      {/* Hero Still Image Layer (Full-bleed behind headline) */}
      <div className="absolute inset-0 z-0 bg-[#16224E]">
        <Image
          src={homeContent.hero.image}
          alt={homeContent.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Local Dark Scrim for Perfect Text Legibility & AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16224E]/95 via-[#16224E]/65 to-[#16224E]/30" />
        <div className="absolute inset-0 bg-[#16224E]/35" />
      </div>

      {/* Hero Content: Headline & Subheadline Bottom-Left (Clean straight edge at bottom) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 sm:pb-20 md:pb-24 pt-28 flex flex-col justify-end">
        <div className="max-w-4xl space-y-6">
          <h1 className="font-heading font-bold text-[clamp(2.5rem,5.75vw,5.75rem)] leading-[0.96] tracking-tight text-white">
            {homeContent.hero.headlineLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>

          <p className="font-body text-white/95 text-lg sm:text-xl md:text-2xl font-normal leading-relaxed max-w-2xl">
            {homeContent.hero.subheadline}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8">
            <a
              href={homeContent.hero.secondaryButton.href}
              onClick={handleDemoClick}
              className="link-arrow text-white hover:text-[#1DAFC8] text-base font-medium group"
            >
              <span className="link-text">{homeContent.hero.secondaryButton.text}</span>
              <span className="arrow-symbol text-[#1DAFC8]">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
