"use client";

import React from "react";
import { BeraConfig } from "@bera/berajs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "~/components/theme-provider";

const queryClient = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
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
