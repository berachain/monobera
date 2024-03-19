"use client";

import React, { type PropsWithChildren } from "react";
import { BeraConfig } from "@bera/berajs";

import { ThemeProvider } from "~/components/theme-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <BeraConfig autoConnect={true}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </BeraConfig>
    </ThemeProvider>
  );
}
