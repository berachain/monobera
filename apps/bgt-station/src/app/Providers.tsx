"use client";

import React from "react";
import { BeraConfig } from "@bera/berajs";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "~/components/theme-provider";
import { beraJsConfig } from "./config";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <BeraConfig autoConnect={true} networkConfig={beraJsConfig}>
          {children}
        </BeraConfig>
      </ThemeProvider>
    </SessionProvider>
  );
}
