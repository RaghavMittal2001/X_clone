// src/app/api/graphql/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ApolloServer } from '@apollo/server';
// Import your schema and resolvers
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server once
const startServer = server.start();

export async function GET(request: NextRequest) {
  await startServer;
  
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  
  if (!query) {
    return NextResponse.json({ 
      error: 'No query provided. Use ?query=your_graphql_query' 
    }, { status: 400 });
  }

  try {
    const result = await server.executeOperation({
      query: decodeURIComponent(query),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('GraphQL GET error:', error);
    return NextResponse.json({ 
      error: 'GraphQL execution error' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await startServer;

  try {
    const body = await request.json();
    const { query, variables, operationName } = body;

    if (!query) {
      return NextResponse.json({ 
        error: 'No query provided in request body' 
      }, { status: 400 });
    }

    const result = await server.executeOperation({
      query,
      variables: variables || {},
      operationName,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('GraphQL POST error:', error);
    return NextResponse.json({ 
      error: 'GraphQL execution error' 
    }, { status: 500 });
  }
}