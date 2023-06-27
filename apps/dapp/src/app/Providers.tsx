"use client";

import React from "react";
import { BeraConfig } from "@bera/berajs";

import { ThemeProvider } from "~/components/theme-provider";
import { beraConfig } from "~/config/beraJs";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BeraConfig networkConfig={beraConfig} autoConnect={true}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </BeraConfig>
  );
}
