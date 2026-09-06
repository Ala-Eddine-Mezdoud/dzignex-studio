import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF where it's supported, WebP everywhere else.
    formats: ["image/avif", "image/webp"],
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
  // These packages are barrel files: a single named import pulls the whole
  // index into the bundle unless Next rewrites it to a deep import.
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "@tabler/icons-react",
      "framer-motion",
      "motion",
      "date-fns",
      "recharts",
    ],
  },
};

export default nextConfig;
