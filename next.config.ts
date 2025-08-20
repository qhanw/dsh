import type { NextConfig } from "next";

const { STATIC_IMAGE_PROTOCOL, STATIC_IMAGE_HOSTNAME, STATIC_IMAGE_PORT } =
  process.env;

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: (STATIC_IMAGE_PROTOCOL || "https") as "http" | "https",
        hostname: STATIC_IMAGE_HOSTNAME || "",
        port: STATIC_IMAGE_PORT,
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
