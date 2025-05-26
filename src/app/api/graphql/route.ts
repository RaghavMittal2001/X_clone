// src/app/api/graphql/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
// Import your schema and resolvers
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers';
 // Adjust path as needed

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

// Correct function signatures for Next.js App Router
export async function GET(request: NextRequest, context: { params: unknown }) {
  return handler(request, context);
}

export async function POST(request: NextRequest, context: { params: unknown }) {
  return handler(request, context);
}

// Alternative approach if you're not using Apollo Server:
// export async function GET(request: NextRequest) {
//   try {
//     // Your GraphQL GET logic here
//     return NextResponse.json({ message: 'GraphQL endpoint' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     // Your GraphQL POST logic here
//     return NextResponse.json({ data: null });
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }