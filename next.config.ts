import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: '',
      },
      {
        protocol: "https",
        hostname: "api.saamsuona.it",
        port: '',
      },
    ]
  }
};

export default nextConfig;
