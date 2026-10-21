"use client";

const steps = [
  {
    step: "01",
    phase: "Phase 01",
    title: "Needs Assessment & Route Planning",
    description:
      "We analyze your organization's shift timings, employee pickup clusters, and vehicle requirements to design structured route itineraries and capacity plans.",
    label: "Route Architecture",
  },
  {
    step: "02",
    phase: "Phase 02",
    title: "Dedicated Fleet & Driver Assignment",
    description:
      "Inspected commercial vehicles and verified chauffeurs are allocated to your routes, with trial runs and safety protocols confirmed before operations commence.",
    label: "Fleet Mobilization",
  },
  {
    step: "03",
    phase: "Phase 03",
    title: "Continuous Tracking & Account Management",
    description:
      "Real-time GPS fleet oversight, transparent operational reporting, consolidated monthly invoicing, and direct dispatch coordination ensure dependable service.",
    label: "Operational Governance",
  },
];

export default function MethodologySection() {
  return (
    <section
      id="methodology"
      className="relative w-full bg-[#FFFFFF] py-20 sm:py-24 md:py-32 px-6 md:px-12 lg:px-20 scroll-mt-20 overflow-hidden border-t border-[#16224E]/08"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 md:mb-24">
          <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block mb-3">
            Execution Process
          </span>

          <h2 className="font-heading font-black uppercase text-[clamp(2.25rem,4.5vw,4.25rem)] text-[#16224E] tracking-[-0.03em] leading-[0.93] mb-6">
            How Enquiries Become Fleet Deployments
          </h2>

          <p className="font-body text-[#16224E]/80 text-base sm:text-lg md:text-xl font-light leading-[1.55] max-w-xl">
            A structured three-phase methodology taking corporate mobility requirements from initial assessment to dependable daily operations.
          </p>
        </div>

        {/* 3-Step Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((item) => (
            <div
              key={item.step}
              className="flex flex-col justify-between p-8 bg-[#F6F8FA] rounded-2xl border border-[#16224E]/10 hover:border-[#1DAFC8]/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#16224E]/10">
                  <span className="font-mono text-xs text-[#1DAFC8] tracking-widest font-bold uppercase">
                    {item.phase}
                  </span>
                  <span className="font-heading font-black text-3xl sm:text-4xl text-[#16224E]/20 group-hover:text-[#16224E]/50 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-heading font-black uppercase text-xl sm:text-2xl text-[#16224E] tracking-tight leading-tight mb-4">
                  {item.title}
                </h3>

                <p className="font-body text-[#16224E]/75 text-[15px] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#16224E]/10 flex items-center justify-between text-xs font-mono text-[#16224E]/60">
                <span className="tracking-widest uppercase">{item.label}</span>
                <span className="text-[#1DAFC8] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
