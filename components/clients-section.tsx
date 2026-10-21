"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface ClientLogo {
  name: string;
  logo: string;
  width: number;
  height: number;
}

const clientLogos: ClientLogo[] = [
  { name: "Amazon", logo: "/clients/amazon.png", width: 140, height: 45 },
  { name: "Laxmi Infobahn", logo: "/clients/laxmi-infobahn.png", width: 135, height: 45 },
  { name: "Clininvent - A TCG Lifesciences Company", logo: "/clients/clininvent.png", width: 165, height: 41 },
  { name: "Swan", logo: "/clients/swan.png", width: 56, height: 56 },
  { name: "Jampana Infra", logo: "/clients/jampana.png", width: 170, height: 42 },
  { name: "AnaCipher Clinical Research", logo: "/clients/anacipher.png", width: 135, height: 52 },
  { name: "SVKM's NMIMS University", logo: "/clients/nmims.png", width: 58, height: 58 },
  { name: "Honour", logo: "/clients/honour.png", width: 160, height: 31 },
  { name: "TSRTC", logo: "/clients/tsrtc.png", width: 56, height: 56 },
];

const BASE_SPEED = 0.9; // px/frame at 60 fps auto-scroll
const FRICTION = 0.94; // momentum decay per frame
const MIN_MOMENTUM_SPEED = 0.2; // below this, snap back to auto-scroll

export default function ClientsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll state
  const scrollPosRef = useRef(0);
  const singleSetWidthRef = useRef(0);

  // Auto-scroll
  const autoSpeedRef = useRef(BASE_SPEED); // current auto speed (lerps toward BASE_SPEED)
  const isAutoScrollingRef = useRef(true);

  // Drag state
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragLastXRef = useRef(0);
  const dragVelocityRef = useRef(0); // momentum velocity after release
  const momentumActiveRef = useRef(false);

  // RAF
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  const clampScroll = useCallback(() => {
    const w = singleSetWidthRef.current;
    if (w <= 0) return;
    // Keep scroll in [w, 2w) — middle of the triple-clone set
    while (scrollPosRef.current >= w * 2) scrollPosRef.current -= w;
    while (scrollPosRef.current < w) scrollPosRef.current += w;
  }, []);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const initTrack = () => {
      const setWidth = container.scrollWidth / 3;
      singleSetWidthRef.current = setWidth;
      if (setWidth > 0) {
        scrollPosRef.current = setWidth;
        container.scrollLeft = setWidth;
      }
    };
    initTrack();

    lastTimeRef.current = performance.now();

    const animate = (now: number) => {
      const dt = Math.min(32, now - lastTimeRef.current);
      lastTimeRef.current = now;
      const dtScale = dt / 16.666; // normalise to 60 fps

      if (containerRef.current) {
        if (isDraggingRef.current) {
          // While dragging: pointer is in control — scroll already updated via event handlers
          // Just clamp and sync
          clampScroll();
          containerRef.current.scrollLeft = scrollPosRef.current;
        } else if (momentumActiveRef.current) {
          // After drag release: apply momentum with friction
          scrollPosRef.current += dragVelocityRef.current * dtScale;
          dragVelocityRef.current *= FRICTION;
          clampScroll();
          containerRef.current.scrollLeft = scrollPosRef.current;
          // When momentum dies down, resume auto-scroll
          if (Math.abs(dragVelocityRef.current) < MIN_MOMENTUM_SPEED) {
            momentumActiveRef.current = false;
            isAutoScrollingRef.current = true;
            autoSpeedRef.current = BASE_SPEED;
          }
        } else if (isAutoScrollingRef.current) {
          // Auto-scroll
          scrollPosRef.current += autoSpeedRef.current * dtScale;
          clampScroll();
          containerRef.current.scrollLeft = scrollPosRef.current;
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => initTrack();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [clampScroll]);

  // ── Pointer drag handlers (supports mouse + touch) ──────────────────────

  const startDrag = useCallback((clientX: number) => {
    isDraggingRef.current = true;
    momentumActiveRef.current = false;
    isAutoScrollingRef.current = false;
    dragStartXRef.current = clientX;
    dragLastXRef.current = clientX;
    dragVelocityRef.current = 0;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  }, []);

  const moveDrag = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return;
    const dx = dragLastXRef.current - clientX; // positive = scrolling right (moving left in the strip)
    dragVelocityRef.current = dx; // remember last frame velocity for momentum
    scrollPosRef.current += dx;
    dragLastXRef.current = clientX;
  }, []);

  const endDrag = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
    // Hand off to momentum
    if (Math.abs(dragVelocityRef.current) > MIN_MOMENTUM_SPEED) {
      momentumActiveRef.current = true;
    } else {
      isAutoScrollingRef.current = true;
      autoSpeedRef.current = BASE_SPEED;
    }
  }, []);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    startDrag(e.clientX);
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    moveDrag(e.clientX);
  };
  const onMouseUp = () => endDrag();
  const onMouseLeave = () => {
    if (isDraggingRef.current) endDrag();
  };

  // Touch events
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startDrag(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    moveDrag(e.touches[0].clientX);
  };
  const onTouchEnd = () => endDrag();

  return (
    <section className="relative w-full bg-[#FFFFFF] pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-28 md:pb-24 border-b border-[#16224E]/08 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 mb-10 sm:mb-12 text-center">
        {/* Heading */}
        <h2 className="font-heading font-black uppercase text-2xl sm:text-3xl md:text-4xl text-[#16224E] tracking-tight leading-tight">
          Trusted by Our Clients
        </h2>
        {/* Supporting sentence */}
        <p className="font-body text-[#16224E]/75 text-base sm:text-lg max-w-2xl mx-auto mt-3 font-light leading-relaxed">
          Powering daily corporate workforce transit, institutional campus routes, and executive mobility across Telangana.
        </p>
      </div>

      {/* Logo track — no fades, no filters, no masks */}
      <div
        className="relative w-full select-none py-2"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={containerRef}
          role="region"
          aria-label="Client partners showcase — drag or touch to scroll"
          className="flex items-center overflow-x-hidden scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] py-4 cursor-grab"
          style={{
            touchAction: "pan-y",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Triple-cloned set for seamless infinite loop */}
          {[0, 1, 2].map((setIndex) => (
            <div
              key={`set-${setIndex}`}
              className="flex items-center shrink-0 space-x-12 sm:space-x-16 md:space-x-20 pr-12 sm:pr-16 md:pr-20"
              aria-hidden={setIndex > 0 ? "true" : undefined}
            >
              {clientLogos.map((client) => (
                <div
                  key={`${client.name}-${setIndex}`}
                  className="flex items-center justify-center shrink-0"
                  title={client.name}
                  tabIndex={setIndex === 0 ? 0 : -1}
                >
                  <div className="relative flex items-center justify-center h-12 sm:h-14 md:h-16 px-2">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={client.width}
                      height={client.height}
                      className="max-h-10 sm:max-h-12 md:max-h-14 w-auto object-contain"
                      priority={false}
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
