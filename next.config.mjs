/** @type {import('next').NextConfig} */

// Base path for GitHub Pages project sites (served under /<repo>/). Empty for a
// user/root site. Set via NEXT_PUBLIC_BASE_PATH (the CI workflow derives it).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Only emit a static export (out/) when explicitly asked (CI). Keeps local
// `next dev` / `next start` working normally.
const isExport = process.env.STATIC_EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,
  ...(isExport ? { output: "export" } : {}),
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
