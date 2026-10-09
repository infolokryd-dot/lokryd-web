import { homeContent } from "@/src/content/home";
import ScrollRevealText from "@/components/scroll-reveal-text";

export default function VisionMissionSection() {
  const { vision, mission } = homeContent.visionMission;

  return (
    <section
      id={homeContent.visionMission.anchor}
      className="below-fold relative w-full bg-[#F6F8FA] py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-20 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Vision */}
          <div className="reveal-init space-y-4 lg:pr-10 lg:border-r lg:border-[#16224E]/10">
            <p className="text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold">
              {vision.label}
            </p>
            <ScrollRevealText
              as="h3"
              className="font-heading font-semibold text-2xl sm:text-3xl text-[#16224E] leading-[1.2] tracking-tight"
            >
              {vision.statement}
            </ScrollRevealText>
          </div>

          {/* Mission */}
          <div className="reveal-init space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold">
              {mission.label}
            </p>
            <ScrollRevealText
              as="h3"
              className="font-heading font-semibold text-2xl sm:text-3xl text-[#16224E] leading-[1.2] tracking-tight"
            >
              {mission.statement}
            </ScrollRevealText>
          </div>
        </div>
      </div>
    </section>
  );
}
