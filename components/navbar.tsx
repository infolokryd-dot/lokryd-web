"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/src/config/site";

interface NavbarProps {
  forceDarkText?: boolean;
}

export default function Navbar({ forceDarkText = false }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  // "dark" = hero/dark section is behind the capsule → show white capsule + dark text
  // "light" = white section is behind the capsule → show dark-blue capsule + white text
  // "top"   = page is at top → capsule is transparent
  const [capsuleTheme, setCapsuleTheme] = useState<"top" | "dark" | "light">("top");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // isDarkForeground: true means we're on dark background with no scroll, so show white logo
  const isDarkForeground = capsuleTheme === "dark" || (capsuleTheme === "top" && !forceDarkText);

  useEffect(() => {
    const NAVBAR_HEIGHT = 64; // approx px — sample point at vertical centre of navbar

    const computeTheme = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);

      if (!scrolled) {
        setCapsuleTheme("top");
        return;
      }

      // Sample the element at the centre of the navbar (top + half navbar height)
      const sampleY = NAVBAR_HEIGHT / 2;
      // Use the horizontal centre of the viewport
      const sampleX = window.innerWidth / 2;

      // Get all elements at the navbar's vertical centre line
      const elements = document.elementsFromPoint(sampleX, sampleY);

      // Walk from front to back, find the first section/div with a background colour
      let isDark = false;
      for (const el of elements) {
        // Skip the navbar itself and its children
        if (navRef.current && navRef.current.contains(el)) continue;
        // Check data-theme attribute (fastest path)
        const theme = (el as HTMLElement).dataset?.theme;
        if (theme === "dark") { isDark = true; break; }
        if (theme === "light") { isDark = false; break; }
        // Fallback: check computed background colour
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          // Parse RGB components
          const m = bg.match(/\d+/g);
          if (m && m.length >= 3) {
            const r = parseInt(m[0]), g = parseInt(m[1]), b = parseInt(m[2]);
            // Relative luminance — dark if luminance < 0.4
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            isDark = luminance < 0.4;
            break;
          }
        }
      }

      setCapsuleTheme(isDark ? "dark" : "light");
    };

    computeTheme();
    window.addEventListener("scroll", computeTheme, { passive: true });
    window.addEventListener("resize", computeTheme, { passive: true });
    return () => {
      window.removeEventListener("scroll", computeTheme);
      window.removeEventListener("resize", computeTheme);
    };
  }, [pathname]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Capsule colour classes (centre nav group only)
  const capsuleBg =
    capsuleTheme === "top"
      ? "bg-transparent"
      : capsuleTheme === "dark"
      ? "bg-white"
      : "bg-[#16224E]";

  const capsuleLinkBase =
    capsuleTheme === "top"
      ? "text-white/90 hover:text-white"
      : capsuleTheme === "dark"
      ? "text-[#16224E]/80 hover:text-[#16224E]"
      : "text-white/85 hover:text-white";

  const capsuleLinkActive =
    capsuleTheme === "top"
      ? "text-white font-semibold"
      : capsuleTheme === "dark"
      ? "text-[#16224E] font-semibold"
      : "text-white font-semibold";

  const capsuleActiveDot =
    capsuleTheme === "dark" ? "bg-[#1DAFC8]" : "bg-[#1DAFC8]";

  return (
    <>
      {/* Accessible Skip-to-content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-5 py-2.5 bg-[#211F5A] text-white text-sm font-medium rounded-full shadow-lg outline-none focus:ring-2 focus:ring-[#1DAFC8]"
      >
        Skip to main content
      </a>

      {/* Outer header: ALWAYS transparent — no background, no blur, no shadow */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 py-4 sm:py-5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* 1. Logo — left */}
          <div className="flex-1 flex justify-start items-center">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DAFC8] rounded shrink-0 select-none"
              aria-label="LOKRYD Home"
            >
              <div className="relative h-7 sm:h-8 w-[84px] sm:w-[96px] shrink-0">
                <Image
                  src="/brand/logo-white.svg"
                  alt="LOKRYD"
                  fill
                  priority
                  className={`object-contain object-left transition-opacity duration-200 ${
                    isDarkForeground ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                />
                <Image
                  src="/brand/logo-full.svg"
                  alt="LOKRYD"
                  fill
                  priority
                  className={`object-contain object-left transition-opacity duration-200 ${
                    !isDarkForeground ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                />
              </div>
            </Link>
          </div>

          {/* 2. Centre capsule — adapts colour to section behind it */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center space-x-1 lg:space-x-2 justify-center shrink-0 px-5 py-2.5 rounded-full transition-all duration-300 ${capsuleBg} ${
              capsuleTheme !== "top" ? "shadow-[0_2px_16px_rgba(22,34,78,0.12)]" : ""
            }`}
          >
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-normal transition-colors duration-200 select-none px-3 py-1 relative flex flex-col items-center font-medium ${
                    isActive ? capsuleLinkActive : `${capsuleLinkBase} font-medium`
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DAFC8] rounded-full`}
                >
                  <span className="whitespace-nowrap">{link.label}</span>
                  {isActive && (
                    <span className={`w-4 h-[2px] ${capsuleActiveDot} rounded-full mt-0.5`} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. Contact Us — right, always dark-blue pill */}
          <div className="flex-1 flex justify-end items-center">
            <div className="hidden md:flex items-center shrink-0">
              <Link
                href="/contact"
                className="text-sm py-2 px-5 sm:px-6 rounded-full font-medium !bg-[#1A2254] !text-white hover:!bg-[#16224E] shadow-[0_2px_10px_rgba(26,34,84,0.3)] hover:shadow-[0_4px_16px_rgba(26,34,84,0.4)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DAFC8]"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-[#1DAFC8] transition-colors duration-200 ${
                isDarkForeground
                  ? "text-white hover:bg-white/10"
                  : "text-[#16224E] hover:bg-[#16224E]/5"
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
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="font-heading text-3xl font-semibold text-white/90 hover:text-[#1DAFC8] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10">
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="w-full text-center py-3.5 rounded-full font-medium !bg-[#1A2254] !text-white hover:!bg-[#16224E] shadow-[0_2px_10px_rgba(26,34,84,0.3)] block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
