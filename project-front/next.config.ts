import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4050",
        pathname: "/items/**",
      },
      {
        protocol: "https",
        hostname: "media.luce.es",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
