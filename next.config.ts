import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow loading images from The Guardian CDN used in mock/news data
    domains: ["media.guim.co.uk"],
  },
};

export default nextConfig;
