"use client";

import React from "react";
import { BeraConfig } from "@bera/berajs";
import { ThemeProvider } from "~/components/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BeraConfig>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </BeraConfig>
  );
}
