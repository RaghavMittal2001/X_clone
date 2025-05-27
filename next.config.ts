import type { NextConfig } from "next";

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
      // This ensures that Prisma's engines are bundled correctly with the serverless function.
      // This is often needed when using the `output: 'standalone'` mode.
      config.externals = [
        ...config.externals,
        '@prisma/client', // Mark Prisma client as external to be bundled by Next.js later
      ];
    }
    return config;
  },
};

export default nextConfig;