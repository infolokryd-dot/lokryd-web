import { homeContent } from "@/src/content/home";
import ScrollRevealText from "@/components/scroll-reveal-text";

export default function StandardsSection() {
  const { label, headline, rows } = homeContent.standards;

  return (
    <section
      id={homeContent.standards.anchor}
      className="below-fold relative w-full bg-[#FFFFFF] py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-20 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-12 sm:mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold mb-4">
            {label}
          </p>
          <ScrollRevealText
            as="h2"
            className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#16224E] tracking-tight leading-tight"
          >
            {headline}
          </ScrollRevealText>
        </div>

        {/* Editorial rows — separated by thin hairlines, not a table */}
        <div className="space-y-0">
          {rows.map((row, idx) => (
            <div
              key={row.before}
              className={`reveal-init grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 sm:py-8 ${
                idx < rows.length - 1 ? "border-b border-[#16224E]/10" : ""
              }`}
            >
              {/* Before state */}
              <div className="md:col-span-5">
                <p className="font-heading font-semibold text-xl sm:text-2xl text-[#16224E]/30 line-through decoration-[#16224E]/15">
                  {row.before}
                </p>
                <p className="font-body text-[#16224E]/50 text-sm sm:text-base mt-1 leading-snug">
                  {row.beforeDetail}
                </p>
              </div>

              {/* Transition mark */}
              <div className="md:col-span-2 flex items-center justify-start md:justify-center pt-1 md:pt-0">
                <span className="text-[#1DAFC8] text-lg font-light select-none" aria-hidden="true">→</span>
              </div>

              {/* After state */}
              <div className="md:col-span-5">
                <p className="font-heading font-semibold text-xl sm:text-2xl text-[#16224E]">
                  {row.after}
                </p>
                <p className="font-body text-[#16224E]/75 text-sm sm:text-base mt-1 leading-snug">
                  {row.afterDetail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
