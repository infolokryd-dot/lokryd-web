import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { homeContent } from "@/src/content/home";

export default function Footer() {
  return (
    <footer className="w-full bg-[#16224E] text-white/80 py-12 sm:py-16 md:py-20 px-6 md:px-12 lg:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start pb-12 sm:pb-14 border-b border-white/10">
          {/* Left Column: Logo & Tagline */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-8 w-32">
                <Image
                  src="/brand/logo-white.svg"
                  alt="LOKRYD"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="font-body text-sm text-white/70 max-w-sm tracking-wide">
              {homeContent.footer.tagline}
            </p>
            <p className="font-body text-xs text-white/50 leading-relaxed max-w-sm">
              Structured corporate employee transportation, executive chauffeur transit, and campus mobility logistics across Telangana.
            </p>
          </div>

          {/* Center Column 1: Main Pages */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold mb-3">
              Navigation
            </p>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-white/75 hover:text-[#1DAFC8] transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-sm text-white/75 hover:text-[#1DAFC8] transition-colors">
                About LOKRYD
              </Link>
              <Link href="/services" className="text-sm text-white/75 hover:text-[#1DAFC8] transition-colors">
                Services
              </Link>
              <Link href="/insights" className="text-sm text-white/75 hover:text-[#1DAFC8] transition-colors">
                Insights
              </Link>
              <Link href="/contact" className="text-sm text-white/75 hover:text-[#1DAFC8] transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Center Column 2: Solutions */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold mb-3">
              Mobility
            </p>
            <nav className="flex flex-col space-y-2">
              <Link href="/corporate-mobility" className="text-sm text-white/75 hover:text-[#1DAFC8] transition-colors">
                Corporate Mobility
              </Link>
              <Link href="/private-mobility" className="text-sm text-white/75 hover:text-[#1DAFC8] transition-colors">
                Private Mobility
              </Link>
              <Link href="/the-standard" className="text-sm text-white/75 hover:text-[#1DAFC8] transition-colors">
                The LOKRYD Standard
              </Link>
              <Link href="/operations-safety" className="text-sm text-white/75 hover:text-[#1DAFC8] transition-colors">
                Operations & Safety
              </Link>
            </nav>
          </div>

          {/* Right Column: Direct Contacts */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold mb-3">
              Direct Operations
            </p>
            <div className="flex flex-col space-y-2.5 text-sm text-white/75">
              <p>
                <span className="text-white/50 block text-xs">Email</span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-[#1DAFC8] transition-colors font-medium"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <span className="text-white/50 block text-xs">Phone</span>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="hover:text-[#1DAFC8] transition-colors font-medium"
                >
                  {siteConfig.phone}
                </a>
              </p>
              <p className="text-xs text-white/50 pt-2">
                Operational Coverage: Hyderabad & Telangana Regional Corridors
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 space-y-4 sm:space-y-0">
          <p>{homeContent.footer.copyright}</p>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1DAFC8]" />
            <span className="tracking-widest uppercase font-mono text-[10px]">
              Corporate & Private Ground Mobility
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
