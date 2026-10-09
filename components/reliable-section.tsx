import Image from "next/image";
import { homeContent } from "@/src/content/home";
import ScrollRevealText from "@/components/scroll-reveal-text";

export default function ReliableSection() {
  return (
    <section
      id={homeContent.reliable.anchor}
      className="below-fold relative w-full bg-[#FFFFFF] py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-20 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <p className="reveal-init text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold mb-4">
          {homeContent.reliable.headline}
        </p>

        {/* Large Stacked Three-line Statement */}
        <div className="max-w-4xl space-y-1.5 mb-6 sm:mb-8">
          {homeContent.reliable.statementLines.map((line) => (
            <ScrollRevealText
              key={line}
              as="h3"
              className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#16224E] leading-[1.08] tracking-tight block"
            >
              {line}
            </ScrollRevealText>
          ))}
        </div>

        {/* Accompanying Body */}
        <div className="max-w-2xl mb-12 sm:mb-14 md:mb-16">
          <p className="reveal-init font-body text-[#16224E]/85 text-base sm:text-lg lg:text-xl leading-relaxed">
            {homeContent.reliable.body}
          </p>
        </div>

        {/* Optional Wide Image Breaking the Margin */}
        {homeContent.reliable.optionalImage && (
          <div className="reveal-init relative w-full sm:-mx-6 md:-mx-12 lg:-mx-16 sm:w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] lg:w-[calc(100%+8rem)] aspect-[21/9] max-h-[460px] mb-12 sm:mb-16 overflow-hidden bg-[#16224E]/10 shadow-[0_16px_40px_rgba(22,34,78,0.06)]">
            <Image
              src={homeContent.reliable.optionalImage}
              alt={homeContent.reliable.optionalImageAlt || "Reliable mobility"}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Four Strictly Aligned Technology & Safety Blocks with 3 Subtle Vertical Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-stretch">
          {homeContent.reliable.items.map((item, idx) => (
            <div key={item.title} className="reveal-init relative flex flex-col">
              <div className="group h-full p-4 -m-4 sm:p-5 sm:-m-5 lg:p-4 lg:-m-4 rounded-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#F6F8FA]/80 hover:shadow-[0_12px_28px_rgba(22,34,78,0.05)] cursor-default flex flex-col">
                <h4 className="font-heading font-semibold text-lg sm:text-xl text-[#16224E] group-hover:text-[#1DAFC8] transition-colors duration-200 mb-2.5 min-h-[3rem] sm:min-h-[3.5rem] flex items-start">
                  {item.title}
                </h4>
                <p className="font-body text-[#16224E]/80 text-[15px] sm:text-[16px] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* 1px Solid Light Grey Vertical Divider between columns (Desktop only: 3 dividers for 4 columns) */}
              {idx < 3 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute -right-6 top-1.5 bottom-1.5 w-[1px] bg-[#D9DDE3] pointer-events-none"
                />
              )}
            </div>
          ))}
        </div>

        {/* Company Priorities — integrated quietly below the technology grid */}
        <div className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-[#16224E]/10">
          <p className="reveal-init text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold mb-8">
            Our Priorities
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {homeContent.reliable.priorities.map((item) => (
              <div key={item.title} className="reveal-init space-y-2">
                <h4 className="font-heading font-semibold text-lg text-[#16224E]">{item.title}</h4>
                <p className="font-body text-[#16224E]/75 text-[15px] sm:text-[16px] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
