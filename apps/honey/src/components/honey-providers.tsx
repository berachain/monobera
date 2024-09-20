"use client";
import { ApolloProvider } from "@apollo/client";
import { honeyClient } from "@bera/graphql";
import { Analytics } from "@vercel/analytics/react";
import { BeraWagmi } from "@bera/wagmi";

export default function HoneyProviders({
  children,
}: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={honeyClient}>
      <BeraWagmi>
        {children}
        <Analytics />
      </BeraWagmi>
    </ApolloProvider>
  );
}
