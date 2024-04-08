"use client";

import React, { type PropsWithChildren } from "react";
import { ApolloProvider } from "@apollo/client";
import { BeraWagmi } from "@bera/wagmi";
import { lendClient } from "@bera/graphql";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: PropsWithChildren<any>) {
  return (
    <BeraWagmi>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ApolloProvider client={lendClient}>{children}</ApolloProvider>
      </ThemeProvider>
    </BeraWagmi>
  );
}
