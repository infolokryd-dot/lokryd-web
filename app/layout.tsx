import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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
  metadataBase: new URL("https://lokryd.in"),
  title: {
    default: "LOKRYD | Corporate & Private Mobility Services",
    template: "%s | LOKRYD",
  },
  description:
    "LOKRYD provides corporate employee transportation, corporate car rentals, airport transfers, outstation travel, and private chauffeur services.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/brand/star.svg",
    apple: "/brand/star.svg",
  },
  openGraph: {
    title: "LOKRYD | Corporate & Private Mobility Services",
    description:
      "Reliable corporate transportation and private mobility services for business and personal journeys.",
    url: "https://lokryd.in/",
    siteName: "LOKRYD",
    images: [
      {
        url: "/images/hero-still.jpg",
        width: 1200,
        height: 675,
        alt: "LOKRYD corporate and private ground mobility services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LOKRYD | Corporate & Private Mobility Services",
    description:
      "Corporate employee transportation, airport transfers, and private chauffeur services.",
    images: ["/images/hero-still.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
