"use client";
import { ApolloProvider } from "@apollo/client";
import { honeyClient } from "@bera/graphql";
import { Analytics } from "@vercel/analytics/react";
import { BeraWagmi } from "@bera/wagmi";
import { BeraJsProvider } from "@bera/berajs";

export default function HoneyProviders({
  children,
}: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={honeyClient}>
      <BeraWagmi>
        <BeraJsProvider configOverride={undefined}>{children}</BeraJsProvider>
        <Analytics />
      </BeraWagmi>
    </ApolloProvider>
  );
}
