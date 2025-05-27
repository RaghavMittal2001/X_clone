// types/prisma-nextjs-monorepo-workaround-plugin.d.ts
declare module '@prisma/nextjs-monorepo-workaround-plugin' {
  export default class PrismaPlugin {
    constructor();
    apply(compiler: unknown): void;
  }
}