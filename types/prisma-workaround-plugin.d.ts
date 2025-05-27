// types/prisma-workaround-plugin.d.ts
declare module '@prisma/nextjs-monorepo-workaround-plugin' {
  import { NextConfig } from 'next';
  const plugin: () => NextConfig;
  export default plugin;
}
