import type { MetadataRoute } from "next";

const SITE_URL = "https://gandla-gajendrakumar.github.io/portfolio-gandla-gajendrakumar";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
}
