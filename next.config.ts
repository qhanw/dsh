import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8081",
        pathname: "/**",
      },
    ],
  },

  // 忽略构建时的TypeScript错误
  // typescript: { ignoreBuildErrors: true },
  // 忽略构建时的ESLint错误
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
