import { homeContent } from "@/src/content/home";
import ScrollRevealText from "@/components/scroll-reveal-text";

export default function PromiseSection() {
  return (
    <section className="below-fold relative w-full bg-[#F6F8FA] py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Headline */}
        <div className="max-w-3xl mb-10 sm:mb-12 md:mb-14">
          <ScrollRevealText
            as="h2"
            className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#16224E] tracking-tight"
          >
            {homeContent.promise.headline}
          </ScrollRevealText>
        </div>

        {/* Three Columns Perfectly Aligned (Zero vertical stagger/offset) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
          {homeContent.promise.items.map((item) => (
            <div key={item.label} className="reveal-init space-y-3">
              <p className="text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold">
                {item.label}
              </p>
              <p className="font-heading font-normal text-xl sm:text-2xl lg:text-[26px] text-[#16224E] leading-[1.3]">
                {item.statement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
