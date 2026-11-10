import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  serverExternalPackages: ["firebase-admin"],
  turbopack: {},
};

export default nextConfig;
