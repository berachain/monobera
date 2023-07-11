"use client";

import React from "react";
import { BeraConfig } from "@bera/berajs";

import { ThemeProvider } from "~/components/theme-provider";
import RouterProvider from "~/context/routerContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BeraConfig autoConnect={true}>
        <RouterProvider>{children}</RouterProvider>
      </BeraConfig>
    </ThemeProvider>
  );
}
