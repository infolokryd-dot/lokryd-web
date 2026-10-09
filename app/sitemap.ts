import type { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";
import { homeContent } from "@/src/content/home";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const serviceSlugs = new Set<string>();
  homeContent.services.items.forEach((item) => {
    serviceSlugs.add(item.id);
    item.subLinks.forEach((sub) => {
      const slug = sub.href.replace("/services/", "");
      if (slug) serviceSlugs.add(slug);
    });
  });

  const serviceUrls: MetadataRoute.Sitemap = Array.from(serviceSlugs).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...serviceUrls,
  ];
}
