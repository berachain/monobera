"use client";

import React, { type PropsWithChildren } from "react";
import { BeraConfig } from "@bera/berajs";

import { ThemeProvider } from "~/components/theme-provider";

export default function Providers({ children }: PropsWithChildren<any>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <BeraConfig autoConnect={true}>{children}</BeraConfig>
    </ThemeProvider>
  );
}
