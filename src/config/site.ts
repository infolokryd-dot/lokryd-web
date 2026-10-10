export interface SiteContactChannel {
  label: string;
  email: string;
  phone: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  url: string;
  heroHeadline: string;
  heroSubheadline: string;
  email: string;
  phone: string;
  contacts: {
    general: SiteContactChannel;
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
  email: "info.lokryd@gmail.com",
  phone: "+91 79972 25599",
  contacts: {
    general: {
      label: "General Enquiries",
      email: "info.lokryd@gmail.com",
      phone: "+91 79972 25599",
    },
  },
  navLinks: [
    { label: "Services", href: "#services" },
    { label: "Why LOKRYD", href: "#reliable" },
    { label: "Technology & Safety", href: "#safety" },
    { label: "Contact", href: "#enquiry" },
  ],
};
