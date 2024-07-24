"use client";

import { ApolloProvider } from "@apollo/client";
import { bgtClient } from "@bera/graphql";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={bgtClient}>
      <section className="container">{children}</section>
    </ApolloProvider>
  );
}
