import { homeContent } from "@/src/content/home";
import ScrollRevealText from "@/components/scroll-reveal-text";

export default function ValueSection() {
  return (
    <section
      id={homeContent.value.anchor}
      className="below-fold relative w-full bg-[#FFFFFF] py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-20 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Statement */}
        <div className="max-w-3xl mb-12 sm:mb-14 md:mb-16">
          {/* Brand Promise — quiet editorial label */}
          <p className="reveal-init text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold mb-4">
            {homeContent.value.brandPromise}
          </p>
          <ScrollRevealText
            as="h2"
            className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#16224E] leading-[1.12] tracking-tight mb-6"
          >
            {homeContent.value.headline}
          </ScrollRevealText>
          <p className="reveal-init font-body text-[#16224E]/85 text-base sm:text-lg lg:text-xl leading-[1.6] font-normal">
            {homeContent.value.paragraph}
          </p>
        </div>

        {/* Three Perfectly Aligned Value Blocks with Visible Rounded Box Background */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {homeContent.value.pillars.map((pillar) => (
            <div key={pillar.title} className="reveal-init flex flex-col">
              <div className="group h-full p-7 sm:p-8 rounded-2xl bg-[#F7F8FA] shadow-[0_2px_10px_rgba(22,34,78,0.03)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#F0F2F6] hover:shadow-[0_12px_28px_rgba(22,34,78,0.07)] cursor-default flex flex-col">
                <h3 className="font-heading font-semibold text-xl sm:text-2xl text-[#16224E] group-hover:text-[#1DAFC8] transition-colors duration-200 mb-3 min-h-[3.25rem] sm:min-h-[3.75rem] flex items-start">
                  {pillar.title}
                </h3>
                <p className="font-body text-[#16224E]/80 text-[16px] sm:text-[17px] leading-[1.6]">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Office on Wheels — integrated editorial callout */}
        <div className="reveal-init mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-[#16224E]/10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold mb-3">
              In Every Ride
            </p>
            <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-[#16224E] leading-tight">
              {homeContent.value.officeOnWheels.headline}
            </h3>
          </div>
          <div className="md:col-span-8 space-y-3">
            <p className="font-heading font-light text-xl sm:text-2xl text-[#16224E]/90 leading-[1.4] tracking-tight">
              &ldquo;{homeContent.value.officeOnWheels.quote}&rdquo;
            </p>
            <p className="font-body text-[#16224E]/70 text-base sm:text-[17px] leading-relaxed">
              {homeContent.value.officeOnWheels.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
