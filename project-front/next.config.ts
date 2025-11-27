import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from the backend API
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4050",
        pathname: "/items/**",
      },
    ],
    // Also allow unoptimized images for local paths
    unoptimized: true,
  },
};

export default nextConfig;
