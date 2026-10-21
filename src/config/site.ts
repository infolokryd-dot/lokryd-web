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
  tagline: "Tailored Mobility for Every Need",
  url: "https://www.lokryd.in",
  heroHeadline: "Move With Purpose. Journeys With Precision.",
  heroSubheadline:
    "Structured, technology-enabled transportation built for modern organizations and the professionals who power them.",
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
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Insights", href: "/insights" },
  ],
};

