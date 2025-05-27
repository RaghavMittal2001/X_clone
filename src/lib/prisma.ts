import { PrismaClient } from '../generated/prisma';
import { withAccelerate } from "@prisma/extension-accelerate";

// Define the extended client type
type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

const createPrismaClient = () => {
  return new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());
};

const globalForPrisma = globalThis as unknown as {
  prisma: ExtendedPrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;