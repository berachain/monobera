"use client";

import React from "react";
import { BeraConfig, globalQueryClient } from "@bera/berajs";
import { QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "~/components/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BeraConfig>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <QueryClientProvider client={globalQueryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </BeraConfig>
  );
}
