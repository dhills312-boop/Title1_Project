import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GITHUB PAGES DEMO: Static-export settings for repo-hosted previews.
  // Remove this block when switching back to a server-hosted deployment.
  output: "export",
  basePath: "/Title1_Project",      // repo name, project page
  assetPrefix: "/Title1_Project/",
  images: { unoptimized: true },    // no Image Optimization on Pages
  trailingSlash: true,
};
export default nextConfig;
