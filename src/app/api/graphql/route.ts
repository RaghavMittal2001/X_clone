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

// Use the full (request, context) signature here
export const GET = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async () => {
    return { prisma };
  },
});

export const POST = GET;
