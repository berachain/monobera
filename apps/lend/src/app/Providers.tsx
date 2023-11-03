"use client";

import React from "react";
import { BeraConfig } from "@bera/berajs";
import { ThemeProvider } from "next-themes";

import RouterProvider from "~/context/routerContext";
import { beraJsConfig } from "./config";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BeraConfig autoConnect={true} networkConfig={beraJsConfig}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
    </BeraConfig>
  );
}
