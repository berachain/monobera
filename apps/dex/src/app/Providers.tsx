"use client";

import React from "react";
import { BeraConfig } from "@bera/berajs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "~/components/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <BeraConfig>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </BeraConfig>
  );
}
