"use client";

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

export default function ClientsSection() {
  // Duplicate list three times to guarantee an unbroken marquee across all viewport widths
  const marqueeItems = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="below-fold relative w-full bg-[#FFFFFF] py-14 sm:py-16 md:py-20 overflow-hidden border-t border-[#16224E]/5">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 mb-8 sm:mb-10 text-center">
        <p className="reveal-init text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold mb-2">
          Trusted Mobility Partner
        </p>
        <h2 className="reveal-init font-heading font-semibold text-2xl sm:text-3xl text-[#16224E] tracking-tight">
          Our Clients
        </h2>
        <p className="reveal-init font-body text-[#16224E]/75 text-sm sm:text-base max-w-2xl mx-auto mt-2 font-light">
          Proudly powering corporate transportation, institutional campuses, and specialized enterprise transit across Telangana.
        </p>
      </div>

      {/* Marquee Track Container with Gradient Edge Fades */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left Fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10"
        />

        {/* Right Fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10"
        />

        {/* Continuous Horizontal Marquee Track */}
        <div className="animate-marquee flex items-center">
          {marqueeItems.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center justify-center px-6 sm:px-10 md:px-12 shrink-0 group select-none"
              title={client.name}
            >
              <div className="relative flex items-center justify-center h-12 sm:h-14 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className="max-h-10 sm:max-h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  priority={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
