"use client";

import React, { type PropsWithChildren } from "react";
import { ApolloProvider } from "@apollo/client";
import { bgtClient } from "@bera/graphql";
import { BeraWagmi } from "@bera/wagmi";

import { ThemeProvider } from "~/components/theme-provider";

export default function Providers({ children }: PropsWithChildren<any>) {
  return (
    <ApolloProvider client={bgtClient}>
      <BeraWagmi>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </BeraWagmi>
    </ApolloProvider>
  );
}
