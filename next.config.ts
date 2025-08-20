import type { NextConfig } from "next";

const hostname = "www.xc01.cc";

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

      // 主要配置 - 使用环境变量
      {
        protocol: (process.env.NEXT_PUBLIC_API_PROTOCOL || "https") as
          | "http"
          | "https",
        hostname: process.env.NEXT_PUBLIC_API_HOST || hostname,
        port: process.env.NEXT_PUBLIC_API_PORT || "443",
        pathname: "/**",
      },
      // 备用配置 - 带端口
      { protocol: "https", hostname, port: "443", pathname: "/**" },
      // 备用配置 - 不带端口
      { protocol: "https", hostname, pathname: "/**" },
      // HTTP 配置（备用）
      { protocol: "http", hostname, port: "80", pathname: "/**" },
      { protocol: "http", hostname, pathname: "/**" },
    ],
  },

  // 忽略构建时的TypeScript错误
  // typescript: { ignoreBuildErrors: true },
  // 忽略构建时的ESLint错误
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
