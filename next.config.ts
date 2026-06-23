import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Allow LAN access from phone for dev preview. Without this Next.js 16
  // blocks HMR / JS chunks and the page renders but nothing is clickable.
  allowedDevOrigins: ["192.168.1.86", "localhost", "127.0.0.1"],
};

export default nextConfig;
