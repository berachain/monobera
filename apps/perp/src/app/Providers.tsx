"use client";

import React, { type PropsWithChildren } from "react";
import { BeraWagmi } from "@bera/wagmi";
import { ThemeProvider } from "next-themes";

import { PriceContextProvider } from "~/context/price-context";
import { TableContextProvider } from "~/context/table-context";
import { PricesMap } from "~/types/prices";
import { BeraJsProvider } from "@bera/berajs";

export default function Providers({
  children,
}: PropsWithChildren<{
  initialPrices?: PricesMap;
}>) {
  return (
    <BeraWagmi>
      <BeraJsProvider configOverride={undefined}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <PriceContextProvider>
            <TableContextProvider>{children}</TableContextProvider>
          </PriceContextProvider>
        </ThemeProvider>
      </BeraJsProvider>
    </BeraWagmi>
  );
}
