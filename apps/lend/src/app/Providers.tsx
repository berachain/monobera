"use client";

import React, { type PropsWithChildren } from "react";
import { ApolloProvider } from "@apollo/client";
import { BeraWagmi } from "@bera/wagmi";
import { lendClient } from "@bera/graphql";
import { ThemeProvider } from "next-themes";
import { BeraJsProvider } from "@bera/berajs";

export default function Providers({ children }: PropsWithChildren<any>) {
  return (
    <BeraWagmi>
      <BeraJsProvider configOverride={undefined}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ApolloProvider client={lendClient}>{children}</ApolloProvider>
        </ThemeProvider>
      </BeraJsProvider>
    </BeraWagmi>
  );
}
