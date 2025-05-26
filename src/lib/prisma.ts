// src/lib/prisma.ts
import { PrismaClient } from "../generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL, // ✅ Don't use NEXT_PUBLIC
}).$extends(withAccelerate());

export default prisma; // ✅ This line is important
