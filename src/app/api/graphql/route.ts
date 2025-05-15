// app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client';
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({ prisma }),
});

export { handler as GET, handler as POST };
export const config = {
  api: {
    bodyParser: false,
  },
};
// This file sets up an Apollo Server with Next.js API routes.
// It uses Prisma as the database client and defines GraphQL schema and resolvers.
