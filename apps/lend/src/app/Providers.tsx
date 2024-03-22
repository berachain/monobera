"use client";

import React, { type PropsWithChildren } from "react";
import { ApolloProvider } from "@apollo/client";
import { BeraConfig } from "@bera/berajs";
import { lendClient } from "@bera/graphql";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: PropsWithChildren<any>) {
  return (
    <BeraConfig>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ApolloProvider client={lendClient}>{children}</ApolloProvider>
      </ThemeProvider>
    </BeraConfig>
  );
}
