import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Memastikan linting tidak memblokir proses build di Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Memastikan verifikasi tipe TypeScript tetap berjalan ketat saat build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
