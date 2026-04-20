import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Title1_Project",      // repo name, project page
  assetPrefix: "/Title1_Project/",
  images: { unoptimized: true },    // no Image Optimization on Pages
  trailingSlash: true,
};
export default nextConfig;
