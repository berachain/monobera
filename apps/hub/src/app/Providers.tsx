"use client";
import React, { type PropsWithChildren } from "react";
import { BeraWagmi } from "@bera/wagmi";
import { ThemeProvider } from "~/components/theme-provider";
import { BlockTimeProvider } from "@bera/berajs";

export default function Providers({ children }: PropsWithChildren<any>) {
  return (
    <BeraWagmi>
      <BlockTimeProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </BlockTimeProvider>
    </BeraWagmi>
  );
}
