import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
      {
        protocol: "https",
        hostname: "1f4bf6f0633aa0d072232e7078f2f338.r2.cloudflarestorage.com",
      },
    ],
  },
};

export default nextConfig;