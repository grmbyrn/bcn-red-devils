import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow loading images from The Guardian CDN and football-data crests
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.guim.co.uk",
      },
      {
        protocol: "https",
        hostname: "crests.football-data.org",
      },
    ],
  },
};

export default nextConfig;
