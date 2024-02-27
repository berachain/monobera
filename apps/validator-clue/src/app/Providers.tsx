"use client";

import React, { type PropsWithChildren } from "react";
import { BeraConfig } from "@bera/berajs";
import { ThemeProvider } from "next-themes";

import { beraJsConfig } from "./config";

export default function Providers({ children }: PropsWithChildren<any>) {
  return (
    <ThemeProvider attribute="class" forcedTheme="light">
      <BeraConfig autoConnect={true} networkConfig={beraJsConfig}>
        {children}
      </BeraConfig>
    </ThemeProvider>
  );
}
