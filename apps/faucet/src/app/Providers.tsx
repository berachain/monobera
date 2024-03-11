"use client";

import React, { type PropsWithChildren } from "react";
import { BeraConfig } from "@bera/berajs";
import { ThemeProvider } from "next-themes";

import { beraJsConfig } from "./config";

export default function Providers({ children }: PropsWithChildren<any>) {
  return (
    <BeraConfig autoConnect={false} networkConfig={beraJsConfig}>
      <ThemeProvider attribute="class" forcedTheme="light">
        {children}
      </ThemeProvider>
    </BeraConfig>
  );
}
