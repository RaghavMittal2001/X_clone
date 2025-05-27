import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');
// import PrismaPlugin from '@prisma/nextjs-monorepo-workaround-plugin';


const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ⚠️ ADD THIS TOP-LEVEL `output` PROPERTY ⚠️
  output: 'standalone', // Enables the standalone output mode

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },

  experimental: {
    serverActions: {},
    // REMOVE THE OLD `outputFileTracingIncludes` BLOCK entirely
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },

  // ✅ Add this webpack configuration for Prisma
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config;
  },
};

export default nextConfig;