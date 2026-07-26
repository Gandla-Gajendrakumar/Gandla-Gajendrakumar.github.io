import type { MetadataRoute } from "next";

// Required for `output: export` (static generation of sitemap.xml).
export const dynamic = "force-static";

const SITE_URL = "https://gandla-gajendrakumar.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
}
