"use client";

import React, { type PropsWithChildren } from "react";
import { BeraConfig } from "@bera/berajs";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: PropsWithChildren<any>) {
  return (
    <BeraConfig autoConnect={false}>
      <ThemeProvider attribute="class" forcedTheme="light">
        {children}
      </ThemeProvider>
    </BeraConfig>
  );
}
