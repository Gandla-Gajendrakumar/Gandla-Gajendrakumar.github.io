import type { MetadataRoute } from "next";

const SITE_URL = "https://gandla-gajendrakumar.github.io/portfolio-gandla-gajendrakumar";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
