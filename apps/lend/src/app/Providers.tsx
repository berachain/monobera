"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BeraConfig } from "@bera/berajs";
import { lendClient } from "@bera/graphql";
import { ThemeProvider } from "next-themes";

import { beraJsConfig } from "./config";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BeraConfig autoConnect={true} networkConfig={beraJsConfig}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ApolloProvider client={lendClient}>{children}</ApolloProvider>
      </ThemeProvider>
    </BeraConfig>
  );
}
