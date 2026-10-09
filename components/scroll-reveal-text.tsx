"use client";

import React, { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  blurStrength?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export default function ScrollReveal({
  children,
  className = "",
  enableBlur = true,
  baseOpacity = 0,
  blurStrength = 4,
  as: Component = "h2",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // React Bits Scroll Reveal entrance effect applied to the entire heading as one unified text element
    const ctx = gsap.context(() => {
      // Check if already well within viewport on mount to avoid unnecessary delay
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight * 0.88;

      gsap.fromTo(
        el,
        {
          opacity: inViewport ? 1 : baseOpacity,
          y: inViewport ? 0 : 16,
          filter: inViewport ? "blur(0px)" : enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, [baseOpacity, blurStrength, enableBlur]);

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={containerRef as any}
      className={`will-change-[opacity,transform,filter] ${className}`}
    >
      {children}
    </Component>
  );
}

export { ScrollReveal as ScrollRevealText };
