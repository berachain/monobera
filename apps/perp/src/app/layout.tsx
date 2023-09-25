"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { Header, TailwindIndicator } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import Providers from "./Providers";
import { navItems } from "./config";

const fontSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <Providers>
          <div className="z-[100]">
            <Toaster position="bottom-right" />
          </div>
          <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
            <Header navItems={navItems} />
            <main className="w-full pt-[72px]">{props.children}</main>
            <Toaster position="bottom-right" />
          </div>
          <TailwindIndicator />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
