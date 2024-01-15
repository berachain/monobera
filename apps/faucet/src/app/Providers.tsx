"use client";

import React from "react";
import { BeraConfig } from "@bera/berajs";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { beraJsConfig } from "./config";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <BeraConfig autoConnect={false} networkConfig={beraJsConfig}>
      <ThemeProvider attribute="class" forcedTheme="light">
        <SessionProvider session={session}>{children}</SessionProvider>
      </ThemeProvider>
    </BeraConfig>
  );
}
