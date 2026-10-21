export interface PillarItem {
  title: string;
  description: string;
}

export interface ServiceSubLink {
  title: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  actionText: string;
  actionHref: string;
  image: string;
  imageAlt: string;
  subLinks: ServiceSubLink[];
}

export interface SafetyItem {
  title: string;
  description: string;
}

export interface ReliableItem {
  title: string;
  description: string;
}

export interface PromiseItem {
  label: string;
  statement: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AudienceType {
  name: string;
  description: string;
}

export interface HomeContent {
  nav: {
    ctaButton: string;
    ctaHref: string;
    skipLinkText: string;
  };
  intro: {
    videoSrc: string;
    posterSrc: string;
    skipButtonText: string;
    maxDurationSeconds: number;
  };
  hero: {
    headlineLines: string[];
    subheadline: string;
    primaryButton: {
      text: string;
      href: string;
    };
    secondaryButton: {
      text: string;
      href: string;
      preselectType: string;
    };
    image: string;
    imageAlt: string;
  };
  value: {
    anchor: string;
    headline: string;
    brandPromise: string;
    paragraph: string;
    pillars: PillarItem[];
    officeOnWheels: {
      headline: string;
      quote: string;
      body: string;
    };
  };
  audiences: {
    bridge: string;
    organizations: {
      title: string;
      image: string;
      imageAlt: string;
      types: AudienceType[];
      links: Array<{
        label: string;
        inquiryType: string;
      }>;
    };
    individuals: {
      title: string;
      image: string;
      imageAlt: string;
      types: AudienceType[];
      links: Array<{
        label: string;
        inquiryType: string;
      }>;
    };
  };
  visionMission: {
    anchor: string;
    vision: {
      label: string;
      statement: string;
    };
    mission: {
      label: string;
      statement: string;
    };
  };
  services: {
    anchor: string;
    headline: string;
    items: ServiceItem[];
    massTransit: {
      headline: string;
      intro: string;
      capabilities: string[];
    };
  };
  standards: {
    anchor: string;
    label: string;
    headline: string;
    rows: Array<{
      before: string;
      after: string;
      beforeDetail: string;
      afterDetail: string;
    }>;
  };
  safety: {
    anchor: string;
    headline: string;
    intro: string;
    backgroundImage: string;
    backgroundImageAlt: string;
    items: SafetyItem[];
  };
  reliable: {
    anchor: string;
    headline: string;
    statementLines: string[];
    body: string;
    items: ReliableItem[];
    priorities: ReliableItem[];
    optionalImage?: string;
    optionalImageAlt?: string;
  };
  promise: {
    headline: string;
    items: PromiseItem[];
    mission: string;
  };
  enquiry: {
    anchor: string;
    headline: string;
    supportText: string;
    quickActions: Array<{
      label: string;
      preselectType: string;
    }>;
    form: {
      fields: {
        fullName: string;
        email: string;
        phone: string;
        organization: string;
        inquiryType: string;
        serviceInterested: string;
        message: string;
        contactMethod: string;
      };
      inquiryTypeOptions: string[];
      serviceInterestedOptions: string[];
      contactMethodOptions: string[];
      submitButton: string;
      submittingText: string;
      successTitle: string;
      successMessage: string;
      resetButtonText: string;
      errorMessage: string;
    };
    faqHeadline: string;
    faqs: FaqItem[];
  };
  footer: {
    tagline: string;
    copyright: string;
  };
}

export const homeContent: HomeContent = {
  nav: {
    ctaButton: "Get Started",
    ctaHref: "#enquiry",
    skipLinkText: "Skip to main content",
  },
  intro: {
    videoSrc: "/video/intro.mp4",
    posterSrc: "/video/intro-poster.jpg",
    skipButtonText: "Skip",
    maxDurationSeconds: 10,
  },
  hero: {
    headlineLines: ["Move With Purpose.", "Journeys With", "Precision."],
    subheadline:
      "Structured, technology-enabled transportation built for modern organizations and the professionals who power them.",
    primaryButton: {
      text: "Get Started",
      href: "#enquiry",
    },
    secondaryButton: {
      text: "Request a Demo",
      href: "#enquiry",
      preselectType: "Corporate Services",
    },
    image: "/images/transport/hero-executive.jpg",
    imageAlt: "LOKRYD corporate fleet of white sedans with uniformed chauffeur standing beside the vehicles",
  },
  value: {
    anchor: "about-lokryd",
    headline: "Your Journey Deserves Better",
    brandPromise: "Transforming commutes from time lost to time valued.",
    paragraph:
      "LOKRYD delivers safe, efficient, and reliable transportation through verified drivers, real-time tracking, and a service-first approach.",
    pillars: [
      {
        title: "Safety You Can Trust",
        description:
          "Every driver verified. Every route monitored. Every journey protected with proven safety protocols and direct operations support.",
      },
      {
        title: "Technology That Serves",
        description:
          "Real-time GPS tracking and route optimization. Our systems work seamlessly so your commute remains predictable.",
      },
      {
        title: "Fleet Care & Hygiene",
        description:
          "Regularly serviced, sanitized vehicles that maintain consistent comfort and mechanical reliability for every passenger.",
      },
    ],
    officeOnWheels: {
      headline: "Office on Wheels",
      quote:
        "Wi-Fi-enabled, quiet cabins designed to turn commute time into work time — or time to unwind.",
      body: "Every LOKRYD journey is engineered for focus and calm, giving passengers the freedom to start the day before they arrive.",
    },
  },
  audiences: {
    bridge:
      "Whether powering thousands of daily employee commutes or delivering discreet executive travel, LOKRYD combines operational rigor with exceptional passenger comfort.",
    organizations: {
      title: "For Organizations",
      image: "/images/transport/campus-fleet.jpg",
      imageAlt: "Dedicated LOKRYD passenger coach bus for corporate workforce mobility",
      types: [
        {
          name: "MNCs & Tech Parks",
          description:
            "High-volume organizations requiring structured employee transportation at scale.",
        },
        {
          name: "SMEs",
          description:
            "Growing businesses needing professional transportation without fleet-management overhead.",
        },
        {
          name: "Consulting Firms",
          description:
            "Companies that value employee time and productivity above all else.",
        },
      ],
      links: [
        { label: "Request a demo", inquiryType: "Corporate Services" },
        { label: "Get a custom quote", inquiryType: "Corporate Services" },
        { label: "Schedule a consultation", inquiryType: "Corporate Services" },
        { label: "Discuss a partnership", inquiryType: "Partnership" },
      ],
    },
    individuals: {
      title: "For Individuals",
      image: "/images/transport/executive-passenger.jpg",
      imageAlt: "Executive passenger in rear cabin of premium vehicle",
      types: [
        {
          name: "Individual Professionals",
          description:
            "Executives and senior professionals seeking a reliable, calm daily commute partner.",
        },
      ],
      links: [
        { label: "Book a ride", inquiryType: "Individual Booking" },
        { label: "Ask a question", inquiryType: "Individual Booking" },
      ],
    },
  },
  visionMission: {
    anchor: "vision-mission",
    vision: {
      label: "Vision",
      statement:
        "To become the trusted commute partner for organizations worldwide, setting the standard for intelligent, sustainable transportation solutions.",
    },
    mission: {
      label: "Mission",
      statement:
        "To revolutionize corporate transportation by combining cutting-edge technology with human-centered service, making every journey safe, efficient, and stress-free.",
    },
  },
  services: {
    anchor: "services",
    headline: "Comprehensive Mobility Solutions",
    items: [
      {
        id: "corporate-transportation",
        name: "Corporate Transportation",
        description:
          "Structured employee transportation with dedicated routes, verified drivers, and enterprise-grade reliability.",
        actionText: "Learn More",
        actionHref: "/services/corporate-transportation",
        image: "/images/transport/sedan-fleet.jpg",
        imageAlt: "Fleet of white LOKRYD corporate sedans lined up for enterprise transport",
        subLinks: [
          {
            title: "Employee Transportation Services",
            href: "/services/employee-transportation",
          },
          {
            title: "Daily Pick-Up & Drop",
            href: "/services/pick-up-and-drop",
          },
          {
            title: "Corporate Car Rental",
            href: "/services/corporate-car-rental",
          },
          {
            title: "Inter & Intra City Rides",
            href: "/services/city-rides",
          },
          {
            title: "Outstation Transportation",
            href: "/services/outstation",
          },
        ],
      },
      {
        id: "shuttle-services",
        name: "Shuttle Services",
        description:
          "Scalable group transportation for offices, events, and conferences with flexible scheduling.",
        actionText: "Explore Shuttles",
        actionHref: "/services/shuttle-services",
        image: "/images/transport/campus-fleet.jpg",
        imageAlt: "Dedicated LOKRYD passenger coach bus for corporate workforce mobility",
        subLinks: [
          {
            title: "Corporate Shuttle Transportation",
            href: "/services/corporate-shuttles",
          },
          {
            title: "Employee Shuttle Programs",
            href: "/services/employee-shuttles",
          },
          {
            title: "Event Shuttle Services",
            href: "/services/event-shuttles",
          },
        ],
      },
      {
        id: "executive-and-events",
        name: "Executive & Event Services",
        description:
          "Premium transportation for airport transfers, conferences, weddings, and special occasions.",
        actionText: "View Services",
        actionHref: "/services/executive-and-events",
        image: "/images/transport/airport-chauffeur.jpg",
        imageAlt: "Executive luxury sedan parked at entrance for private chauffeur and event travel",
        subLinks: [
          {
            title: "Airport Transfers",
            href: "/services/airport-transfers",
          },
          {
            title: "Conference Transportation",
            href: "/services/conference-transport",
          },
          {
            title: "Special Event Transportation",
            href: "/services/event-transportation",
          },
          {
            title: "Wedding Car Services",
            href: "/services/wedding-cars",
          },
        ],
      },
    ],
    massTransit: {
      headline: "Mass Transit Solutions",
      intro:
        "Dedicated transportation for campuses, tech parks, employee routes, and large-scale events.",
      capabilities: [
        "Corporate transportation for large campuses and tech parks",
        "Fixed-route employee shuttle services",
        "High-capacity transportation for conferences, exhibitions, and events",
      ],
    },
  },
  standards: {
    anchor: "lokryd-standard",
    label: "The LOKRYD Standard",
    headline: "What we replaced. What we built.",
    rows: [
      {
        before: "Unpredictable",
        after: "Disciplined",
        beforeDetail: "Late arrivals and inconsistent service",
        afterDetail: "Structured schedules and dependable service",
      },
      {
        before: "Unsafe",
        after: "Secure",
        beforeDetail: "Unverified drivers and vehicles",
        afterDetail: "Verified drivers and real-time tracking",
      },
      {
        before: "Unproductive",
        after: "Serene",
        beforeDetail: "Noisy, uncomfortable rides",
        afterDetail: "Comfortable journeys designed for work or rest",
      },
    ],
  },
  safety: {
    anchor: "safety",
    headline: "Safety Engineered Into Every Journey",
    intro:
      "At LOKRYD, passenger safety is anchored by verified chauffeurs, regular vehicle maintenance, and real-time route monitoring.",
    backgroundImage: "/images/safety.jpg",
    backgroundImageAlt: "Interior view of vehicle highlighting passenger safety controls and seat belts",
    items: [
      {
        title: "Operations Support",
        description:
          "Direct operations assistance and route dispatch support ready to respond to schedule or itinerary requirements.",
      },
      {
        title: "Real-Time GPS Tracking",
        description:
          "Continuous location tracking across all fleet vehicles providing route adherence and trip visibility.",
      },
      {
        title: "Verified Driver Profiles",
        description:
          "Complete driver credentials including commercial license verification, identity validation, and background screening.",
      },
      {
        title: "Pre-Dispatch Vehicle Checks",
        description:
          "Routine tyre, brake, and safety control checks performed before daily route assignments.",
      },
    ],
  },
  reliable: {
    anchor: "reliable",
    headline: "Reliable by Design",
    statementLines: [
      "No surge pricing.",
      "No driver unavailability.",
      "No last-minute cancellations.",
    ],
    body: "We operate on structured schedules with dedicated resources for consistent, dependable service.",
    items: [
      {
        title: "Real-Time GPS Tracking",
        description:
          "Know exactly where your ride is, share trip details, and travel with complete transparency.",
      },
      {
        title: "Verified Driver Network",
        description:
          "Background-checked, trained professionals committed to safety, punctuality, and exceptional service.",
      },
      {
        title: "Contactless Experience",
        description:
          "App-based booking, digital payments, and paperless receipts for a seamless modern experience.",
      },
      {
        title: "Data-Driven Insights",
        description:
          "Corporate dashboards with analytics on usage patterns, cost optimization, and employee satisfaction.",
      },
    ],
    priorities: [
      {
        title: "Customer Satisfaction",
        description:
          "Real-time tracking, responsive support, and transparent pricing — at every stage of the journey.",
      },
      {
        title: "Safety & Compliance",
        description:
          "High safety standards and strict compliance with transport regulations across all operations.",
      },
      {
        title: "Fleet Management",
        description:
          "Well-maintained vehicles supported by GPS and telematics for consistent performance monitoring.",
      },
    ],
    optionalImage: "/images/reliable.jpg",
    optionalImageAlt: "Scenic open highway stretching into a dawn horizon with motion blur",
  },
  promise: {
    headline: "The LOKRYD Promise",
    items: [
      {
        label: "To Employees",
        statement: "Reclaim your commute time. Travel safely. Arrive ready.",
      },
      {
        label: "To Organizations",
        statement:
          "Reduce complexity. Enhance employee satisfaction. Access data-driven insights for smarter decisions.",
      },
      {
        label: "To Our Community",
        statement:
          "Operate responsibly. Support local drivers. Contribute to sustainable urban mobility.",
      },
    ],
    mission:
      "To revolutionize corporate transportation by combining cutting-edge technology with human-centered service, making every journey safe, efficient, and stress-free.",
  },
  enquiry: {
    anchor: "enquiry",
    headline: "Ready to Elevate Your Commute?",
    supportText: "Let's Start the Conversation",
    quickActions: [
      {
        label: "Book Your Ride",
        preselectType: "Individual Booking",
      },
      {
        label: "Schedule a Consultation",
        preselectType: "Corporate Services",
      },
    ],
    form: {
      fields: {
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        organization: "Organization Name",
        inquiryType: "Inquiry Type",
        serviceInterested: "Service Interested In",
        message: "Message",
        contactMethod: "Preferred Contact Method",
      },
      inquiryTypeOptions: [
        "Corporate Services",
        "Individual Booking",
        "Partnership",
        "Support",
        "Other",
      ],
      serviceInterestedOptions: [
        "Employee Transportation",
        "Shuttle Services",
        "Car Rental",
        "Event Transport",
        "Mass Transit",
        "Other",
      ],
      contactMethodOptions: ["Email", "Phone", "WhatsApp"],
      submitButton: "Submit Inquiry",
      submittingText: "Submitting...",
      successTitle: "Inquiry Received",
      successMessage:
        "Thank you for contacting LOKRYD. A member of our corporate team will review your requirements and reach out shortly.",
      resetButtonText: "Send Another Inquiry",
      errorMessage:
        "We were unable to transmit your inquiry. Please try again or reach out directly to info.lokryd@gmail.com.",
    },
    faqHeadline: "Frequently Asked Questions",
    // TODO: Source document is cut off after this single item. More FAQ items will be added in a future phase.
    faqs: [
      {
        question: "How do I get started with employee transportation services?",
        answer:
          "Contact our corporate team for a free needs assessment. We'll analyze your requirements and design a custom solution with transparent pricing.",
      },
    ],
  },
  footer: {
    tagline: "Seamless Journeys. Elevated Experience.",
    copyright: `© LOKRYD ${new Date().getFullYear()}. All rights reserved.`,
  },
};
