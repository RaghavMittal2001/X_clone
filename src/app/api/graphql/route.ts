// app/api/graphql/route.ts

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create handler compatible with Next.js App Router API routes
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async () => ({ prisma }),
});

// Export GET and POST handlers
export const GET = handler;
export const POST = handler;
