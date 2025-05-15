'use client';

import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(), 
});

// ApolloWrap.tsx
// This is a wrapper component for Apollo Client  

 
 
 const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
   return (
     <ApolloProvider client={client}>
       {children}
     </ApolloProvider>
   );
 }
 
 export default ApolloWrapper
 