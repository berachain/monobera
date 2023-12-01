"use client";

import React from "react";
import { BeraConfig } from "@bera/berajs";

import { ThemeProvider } from "~/components/theme-provider";
import { beraJsConfig } from "./config";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BeraConfig autoConnect={true} networkConfig={beraJsConfig}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </BeraConfig>
  );
}
