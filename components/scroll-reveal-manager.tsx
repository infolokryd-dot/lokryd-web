"use client";

import { useEffect } from "react";

export default function ScrollRevealManager() {
  useEffect(() => {
    // Under prefers-reduced-motion, reveal everything immediately
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.querySelectorAll(".reveal-init").forEach((el) => {
        el.classList.add("reveal-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-revealed");
            obs.unobserve(entry.target); // Reveal fires once only
          }
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.05,
      }
    );

    const elements = document.querySelectorAll(".reveal-init");
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // If already in viewport at initial page load, reveal immediately without offset
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add("reveal-revealed");
      } else {
        observer.observe(el);
      }
    });

    // 2s safety timeout that unconditionally reveals anything still hidden
    const safetyTimeout = setTimeout(() => {
      document.querySelectorAll(".reveal-init:not(.reveal-revealed)").forEach((el) => {
        el.classList.add("reveal-revealed");
      });
    }, 2000);

    return () => {
      clearTimeout(safetyTimeout);
      observer.disconnect();
    };
  }, []);

  return null;
}
