import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/intro.mp4",
        destination: "/intro.mp4.mp4",
      },
    ];
  },
};

export default nextConfig;
