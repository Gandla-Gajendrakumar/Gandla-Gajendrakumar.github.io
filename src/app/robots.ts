import type { MetadataRoute } from "next";

// Required for `output: export` (static generation of robots.txt).
export const dynamic = "force-static";

const SITE_URL = "https://gandla-gajendrakumar.github.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
