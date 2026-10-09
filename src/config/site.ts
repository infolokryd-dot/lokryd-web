export interface SiteContactChannel {
  label: string;
  email: string;
  phone?: string;
  hours?: string;
  note?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  url: string;
  heroHeadline: string;
  heroSubheadline: string;
  contacts: {
    corporate: SiteContactChannel;
    support: SiteContactChannel;
    partnerships: SiteContactChannel;
  };
  navLinks: Array<{ label: string; href: string }>;
}

export const siteConfig: SiteConfig = {
  name: "LOKRYD",
  tagline: "Seamless Journeys. Elevated Experience.",
  url: "https://www.lokryd.com",
  heroHeadline: "Elevate Every Commute",
  heroSubheadline:
    "Structured, technology-enabled transportation solutions designed for modern organizations and professionals.",
  contacts: {
    corporate: {
      label: "Corporate Inquiries",
      email: "corporate@lokryd.com",
      hours: "Monday-Friday, 9 AM - 6 PM",
    },
    support: {
      label: "Customer Support",
      email: "support@lokryd.com",
      phone: "+91 79972 25599",
      note: "24/7 Helpline",
    },
    partnerships: {
      label: "Partnerships & Alliances",
      email: "partnerships@lokryd.com",
    },
  },
  navLinks: [
    { label: "Services", href: "#services" },
    { label: "Why LOKRYD", href: "#reliable" },
    { label: "Technology & Safety", href: "#safety" },
    { label: "Contact", href: "#enquiry" },
  ],
};
