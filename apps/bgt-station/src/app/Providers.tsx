"use client";

import React, { type PropsWithChildren } from "react";
import { BeraConfig } from "@bera/berajs";

import { ThemeProvider } from "~/components/theme-provider";
import { beraJsConfig } from "./config";

export default function Providers({ children }: PropsWithChildren<any>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <BeraConfig autoConnect={true} networkConfig={beraJsConfig}>
        {children}
      </BeraConfig>
    </ThemeProvider>
  );
}
