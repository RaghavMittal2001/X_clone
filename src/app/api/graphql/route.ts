import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { type NextRequest } from "next/server"; // ✅ Required type

import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Export GET and POST handlers explicitly typed for Next.js App Router
const handler = startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
