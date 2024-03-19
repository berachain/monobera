"use client";

import React, { type PropsWithChildren } from "react";
import { ApolloProvider } from "@apollo/client";
import { BeraConfig } from "@bera/berajs";
import { lendClient } from "@bera/graphql";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: PropsWithChildren<any>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <BeraConfig autoConnect={true}>
        <ApolloProvider client={lendClient}>{children}</ApolloProvider>
      </BeraConfig>
    </ThemeProvider>
  );
}
