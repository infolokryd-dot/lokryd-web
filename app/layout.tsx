import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/src/config/site";
import "./globals.css";

const overusedGrotesk = localFont({
  src: "../public/fonts/OverusedGrotesk-VF.woff2",
  variable: "--font-heading",
  display: "swap",
  fallback: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

const roboto = localFont({
  src: [
    {
      path: "../public/fonts/Roboto-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Roboto-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Roboto-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "LOKRYD — Elevate Every Commute",
  description: siteConfig.heroSubheadline,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/brand/star.svg",
    apple: "/brand/star.svg",
  },
  openGraph: {
    title: "LOKRYD — Elevate Every Commute",
    description: siteConfig.heroSubheadline,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/hero-still.jpg",
        width: 1200,
        height: 675,
        alt: "LOKRYD Premium Ground Mobility",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LOKRYD — Elevate Every Commute",
    description: siteConfig.heroSubheadline,
    images: ["/images/hero-still.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${overusedGrotesk.variable} ${roboto.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js");',
          }}
        />
      </head>
      <body className="min-h-screen bg-[#FFFFFF] text-[#16224E] font-body selection:bg-[#1DAFC8]/20 selection:text-[#211F5A]">
        {children}
      </body>
    </html>
  );
}
