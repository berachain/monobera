"use client";

import React, { type PropsWithChildren } from "react";
import { BeraWagmi } from "@bera/wagmi";
import { ThemeProvider } from "next-themes";

import { PriceContextProvider } from "~/context/price-context";
import { TableContextProvider } from "~/context/table-context";

export default function Providers({
  children,
  initialWagmiState,
}: PropsWithChildren<any>) {
  return (
    <BeraWagmi initialWagmiState={initialWagmiState}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <PriceContextProvider>
          <TableContextProvider>{children}</TableContextProvider>
        </PriceContextProvider>
      </ThemeProvider>
    </BeraWagmi>
  );
}
