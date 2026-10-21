import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// TODO: Real service pages will replace this minimal temporary route in Phase 2.
// Do not write any permanent service-page content here during Phase 1.

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatSlugToTitle(slug: string): string {
  if (!slug) return "Service Details";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = formatSlugToTitle(slug);

  return {
    title: `${title} — LOKRYD`,
    description: `Detailed information for ${title} from LOKRYD corporate ground mobility.`,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const title = formatSlugToTitle(slug);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#16224E]">
      <Navbar forceDarkText={true} />

      <main
        id="main-content"
        className="flex-1 flex flex-col items-center justify-center text-center px-6 py-36 md:py-48 max-w-4xl mx-auto"
      >
        <span className="text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold mb-4">
          LOKRYD Mobility Services
        </span>

        <h1 className="font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl text-[#16224E] tracking-tight mb-6">
          {title}
        </h1>

        <p className="font-body text-lg sm:text-xl text-[#16224E]/80 max-w-xl mb-10 leading-relaxed">
          Comprehensive mobility options tailored for corporate workforces, campus shuttles, and executive travel.
        </p>

        <div>
          <Link href="/contact" className="btn-primary text-base py-3 px-8">
            Make an Enquiry
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
