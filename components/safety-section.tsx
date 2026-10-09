import Image from "next/image";
import { homeContent } from "@/src/content/home";
import ScrollRevealText from "@/components/scroll-reveal-text";

export default function SafetySection() {
  return (
    <section
      id={homeContent.safety.anchor}
      className="below-fold relative w-full bg-[#16224E] text-white py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-20 scroll-mt-20 overflow-hidden"
    >
      {/* Darkened Atmospheric Background Image (Local dim scrim only for legibility) */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#16224E]">
        <Image
          src={homeContent.safety.backgroundImage}
          alt={homeContent.safety.backgroundImageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[#16224E]/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header Block: Left-aligned on vertical axis */}
        <div className="max-w-3xl mb-12 sm:mb-14 md:mb-16">
          <ScrollRevealText
            as="h2"
            className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12] mb-5"
          >
            {homeContent.safety.headline}
          </ScrollRevealText>
          <p className="reveal-init font-body text-white/85 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
            {homeContent.safety.intro}
          </p>
        </div>

        {/* Items Typographic List (No cards, no icons, separated by 15% white hairlines) */}
        <div className="space-y-0">
          {homeContent.safety.items.map((item) => (
            <div
              key={item.title}
              className="reveal-init py-6 sm:py-7 border-b border-white/15 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start group"
            >
              <div className="md:col-span-5">
                <h3 className="font-heading font-medium text-xl sm:text-2xl text-white group-hover:text-[#1DAFC8] transition-colors">
                  {item.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="font-body text-white/80 text-[15px] sm:text-[16px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
