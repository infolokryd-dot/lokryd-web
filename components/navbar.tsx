"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { homeContent } from "@/src/content/home";

interface NavbarProps {
  forceScrolled?: boolean;
}

export default function Navbar({ forceScrolled = false }: NavbarProps) {
  const [isDarkSection, setIsDarkSection] = useState(!forceScrolled);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerY = 40; // Midpoint of header in viewport
      const scrollY = window.scrollY;

      // Fully transparent at top; blurred glass once user has scrolled
      setIsScrolled(scrollY > 0);

      // Check Safety section (navy background)
      const safetyEl = document.getElementById("safety");
      let overSafety = false;
      if (safetyEl) {
        const rect = safetyEl.getBoundingClientRect();
        overSafety = rect.top <= headerY && rect.bottom >= headerY;
      }

      // Check Footer (navy background)
      const footerEl = document.querySelector("footer");
      let overFooter = false;
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        overFooter = rect.top <= headerY && rect.bottom >= headerY;
      }

      // Check Hero (dark image background)
      const heroEl = document.querySelector("section"); // First section is hero
      let overHero = false;
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        overHero = rect.bottom > headerY;
      }

      setIsDarkSection(overHero || overSafety || overFooter);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Accessible Skip-to-content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-5 py-2.5 bg-[#211F5A] text-white text-sm font-medium rounded-full shadow-lg outline-none focus:ring-2 focus:ring-[#1DAFC8]"
      >
        {homeContent.nav.skipLinkText}
      </a>

      {/* Main Fixed Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-40 py-3 sm:py-3.5 transition-all duration-300 ${
        isScrolled
          ? isDarkSection
            ? "bg-white/5 backdrop-blur-[6px]"
            : "bg-white/70 backdrop-blur-[6px] shadow-[0_1px_0_rgba(22,34,78,0.06)]"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo / Wordmark Left */}
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DAFC8] rounded shrink-0"
            aria-label="LOKRYD Home"
          >
            <div className="relative h-7 w-28 sm:h-8 sm:w-32 transition-opacity duration-300">
              <Image
                src={isDarkSection ? "/brand/logo-white.svg" : "/brand/logo-full.svg"}
                alt="LOKRYD"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation: One Shared Rounded Container with 4 Individual Rounded Items */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center p-1 rounded-full border transition-all duration-300 ${
              !isScrolled
                ? "bg-transparent border-white/20"
                : isDarkSection
                ? "bg-white/10 backdrop-blur-md border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
                : "bg-white/60 backdrop-blur-md border-[#16224E]/10 shadow-[0_2px_12px_rgba(22,34,78,0.05)]"
            }`}
          >
            <div className="flex items-center space-x-1">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 select-none ${
                    isDarkSection
                      ? "text-white/85 hover:text-white hover:bg-white/20"
                      : "text-[#16224E]/85 hover:text-[#16224E] hover:bg-white/90 hover:shadow-[0_2px_6px_rgba(22,34,78,0.06)]"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DAFC8]`}
                >
                  <span className="whitespace-nowrap">{link.label}</span>
                </a>
              ))}
            </div>
          </nav>

          {/* Right Action: Primary CTA Button (Separate from the 4-item navigation) */}
          <div className="hidden md:flex items-center shrink-0">
            <a href={homeContent.nav.ctaHref} className="btn-primary text-sm py-2.5 px-6">
              {homeContent.nav.ctaButton}
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#1DAFC8] transition-all duration-300 ${
              !isScrolled
                ? "text-white bg-transparent border-white/30"
                : isDarkSection
                ? "text-white bg-white/10 backdrop-blur-md border-white/20"
                : "text-[#16224E] bg-white/60 backdrop-blur-md border-[#16224E]/10"
            }`}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="fixed inset-0 z-50 bg-[#16224E] text-white flex flex-col justify-between px-8 py-10 md:hidden animate-fade-in"
        >
          <div className="flex items-center justify-between">
            <div className="relative h-8 w-32">
              <Image
                src="/brand/logo-white.svg"
                alt="LOKRYD"
                fill
                className="object-contain object-left"
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1DAFC8]"
              aria-label="Close menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col space-y-7 my-auto"
          >
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="font-heading text-3xl font-semibold text-white/90 hover:text-[#1DAFC8] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10">
            <a
              href={homeContent.nav.ctaHref}
              onClick={handleLinkClick}
              className="btn-primary w-full text-center py-3.5"
            >
              {homeContent.nav.ctaButton}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
