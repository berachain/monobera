"use client";

import React from "react";
import { BeraConfig } from "@bera/berajs";

import { ThemeProvider } from "~/components/theme-provider";
import { beraJsConfig } from "./config";

export default function Providers({ children }: { children: React.ReactNode }) {
  console.log('I AM HERE WHYTYYTER')
  return (
    <BeraConfig autoConnect={true} networkConfig={beraJsConfig}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </BeraConfig>
  );
}
