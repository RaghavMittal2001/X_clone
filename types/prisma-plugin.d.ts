import { NextConfig } from "next";

// types/prisma-plugin.d.ts
declare module '@prisma/nextjs-monorepo-workaround-plugin' {
  const plugin: NextConfig;
  export default plugin;
}
