import Image from "next/image";
import { siteConfig } from "@/src/config/site";
import { homeContent } from "@/src/content/home";

export default function Footer() {
  return (
    <footer className="w-full bg-[#16224E] text-white/80 py-12 sm:py-16 md:py-20 px-6 md:px-12 lg:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start pb-12 sm:pb-14 border-b border-white/10">
          {/* Left Column: Logo & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative h-8 w-32">
              <Image
                src="/brand/logo-white.svg"
                alt="LOKRYD"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="font-body text-sm text-white/70 max-w-sm tracking-wide">
              {homeContent.footer.tagline}
            </p>
          </div>

          {/* Center Column: Navigation Anchors */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold mb-4">
              Navigation
            </p>
            <nav className="flex flex-col space-y-2.5">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/75 hover:text-[#1DAFC8] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Column: Direct Emails */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold mb-4">
              Direct Contact
            </p>
            <div className="flex flex-col space-y-2 text-sm text-white/75">
              {siteConfig.contacts.support.phone && (
                <a
                  href={`tel:${siteConfig.contacts.support.phone.replace(/\s/g, "")}`}
                  className="hover:text-[#1DAFC8] transition-colors font-medium"
                >
                  {siteConfig.contacts.support.phone}
                </a>
              )}
              <a
                href={`mailto:${siteConfig.contacts.corporate.email}`}
                className="hover:text-[#1DAFC8] transition-colors"
              >
                {siteConfig.contacts.corporate.email}
              </a>
              <a
                href={`mailto:${siteConfig.contacts.support.email}`}
                className="hover:text-[#1DAFC8] transition-colors"
              >
                {siteConfig.contacts.support.email}
              </a>
              <a
                href={`mailto:${siteConfig.contacts.partnerships.email}`}
                className="hover:text-[#1DAFC8] transition-colors"
              >
                {siteConfig.contacts.partnerships.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright (No social links) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 space-y-4 sm:space-y-0">
          <p>{homeContent.footer.copyright}</p>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
            <span className="tracking-widest uppercase font-mono text-[10px]">
              Corporate Ground Mobility
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
