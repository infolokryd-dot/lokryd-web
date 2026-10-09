"use client";

import Image from "next/image";
import { homeContent } from "@/src/content/home";
import ScrollRevealText from "@/components/scroll-reveal-text";

interface AudiencesSectionProps {
  onPreselectInquiry?: (type: string) => void;
}

export default function AudiencesSection({ onPreselectInquiry }: AudiencesSectionProps) {
  const handleLinkClick = (e: React.MouseEvent, inquiryType: string) => {
    e.preventDefault();
    if (onPreselectInquiry) {
      onPreselectInquiry(inquiryType);
    } else {
      window.dispatchEvent(
        new CustomEvent("lokryd:select-inquiry", {
          detail: { inquiryType },
        })
      );
    }
    const enquiryEl = document.getElementById("enquiry");
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="below-fold relative w-full bg-[#F6F8FA] py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Bridge Statement */}
        <div className="max-w-3xl mb-16 sm:mb-20 md:mb-24">
          <p className="reveal-init font-body text-[#16224E] text-xl sm:text-2xl lg:text-[28px] leading-[1.35] font-light">
            {homeContent.audiences.bridge}
          </p>
        </div>

        {/* Editorial Alternating Layout (Substantial Images, Generous Whitespace, NOT Cards) */}
        <div className="space-y-20 sm:space-y-24 md:space-y-32">
          {/* Sub-section 1: For Organizations [LARGE IMAGE] [TEXT & LINKS] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Large Visually Dominant Image (Full Composition - Aspect 3/4 matches native 896x1200) */}
            <div className="lg:col-span-7">
              <div className="reveal-init relative w-full max-w-lg lg:max-w-none aspect-[3/4] max-h-[680px] overflow-hidden bg-[#16224E]/10 shadow-[0_16px_40px_rgba(22,34,78,0.06)] mx-auto lg:mx-0 group/img">
                <Image
                  src={homeContent.audiences.organizations.image}
                  alt={homeContent.audiences.organizations.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover/img:scale-[1.025]"
                  priority={false}
                />
              </div>
            </div>

            {/* Content & Links Right (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-4">
              <div className="space-y-3">
                <ScrollRevealText
                  as="h3"
                  className="font-heading font-semibold text-3xl sm:text-4xl text-[#16224E] leading-tight"
                >
                  {homeContent.audiences.organizations.title}
                </ScrollRevealText>
              </div>

              {/* Who We Serve — compact typographic list */}
              <div className="reveal-init space-y-4 border-t border-[#16224E]/10 pt-5">
                {homeContent.audiences.organizations.types.map((type) => (
                  <div key={type.name}>
                    <p className="font-heading font-medium text-[15px] text-[#16224E] mb-0.5">{type.name}</p>
                    <p className="font-body text-[#16224E]/70 text-[14px] leading-snug">{type.description}</p>
                  </div>
                ))}
              </div>

              <div className="reveal-init pt-2">
                <ul className="space-y-3.5">
                  {homeContent.audiences.organizations.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href="#enquiry"
                        onClick={(e) => handleLinkClick(e, link.inquiryType)}
                        className="link-arrow text-[17px] font-normal text-[#16224E] group inline-flex items-center"
                      >
                        <span className="link-text">{link.label}</span>
                        <span className="arrow-symbol text-[#1DAFC8]">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sub-section 2: For Individuals [TEXT & LINKS] [LARGE IMAGE] (Alternating) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Content & Links Left on desktop (5 cols, order-2 lg:order-1) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pr-4 order-2 lg:order-1">
              <div className="space-y-3">
                <ScrollRevealText
                  as="h3"
                  className="font-heading font-semibold text-3xl sm:text-4xl text-[#16224E] leading-tight"
                >
                  {homeContent.audiences.individuals.title}
                </ScrollRevealText>
              </div>

              {/* Who We Serve — compact typographic list */}
              <div className="reveal-init space-y-4 border-t border-[#16224E]/10 pt-5">
                {homeContent.audiences.individuals.types.map((type) => (
                  <div key={type.name}>
                    <p className="font-heading font-medium text-[15px] text-[#16224E] mb-0.5">{type.name}</p>
                    <p className="font-body text-[#16224E]/70 text-[14px] leading-snug">{type.description}</p>
                  </div>
                ))}
              </div>

              <div className="reveal-init pt-2">
                <ul className="space-y-3.5">
                  {homeContent.audiences.individuals.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href="#enquiry"
                        onClick={(e) => handleLinkClick(e, link.inquiryType)}
                        className="link-arrow text-[17px] font-normal text-[#16224E] group inline-flex items-center"
                      >
                        <span className="link-text">{link.label}</span>
                        <span className="arrow-symbol text-[#1DAFC8]">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Large Visually Dominant Image Right on desktop (Aspect 4/3 matches native 1200x896) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="reveal-init relative w-full max-w-lg lg:max-w-none aspect-[4/3] max-h-[580px] overflow-hidden bg-[#16224E]/10 shadow-[0_16px_40px_rgba(22,34,78,0.06)] mx-auto lg:mx-0 group/img">
                <Image
                  src={homeContent.audiences.individuals.image}
                  alt={homeContent.audiences.individuals.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover/img:scale-[1.025]"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
