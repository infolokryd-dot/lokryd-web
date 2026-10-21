import type { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/corporate-mobility", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/private-mobility", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/the-standard", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/operations-safety", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/insights", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
