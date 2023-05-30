"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { BeraConfig } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Toaster } from "@bera/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

import { SiteFooter } from "~/components/footer";
import { Header } from "~/components/header";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { ThemeProvider } from "~/components/theme-provider";
import { beraConfig } from "~/config/beraJs";

const fontSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <BeraConfig networkConfig={beraConfig} autoConnect={true}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col overflow-hidden">
              <div className="flex-1">
                <Header />
                <main className="container w-full pt-40">{props.children}</main>
                <Toaster />
              </div>
              <SiteFooter />
            </div>
            <TailwindIndicator />
          </ThemeProvider>
          <Analytics />
        </BeraConfig>
      </body>
    </html>
  );
}
