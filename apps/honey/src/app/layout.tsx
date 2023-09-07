"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import { IBM_Plex_Sans, Jua } from "next/font/google";
import { BeraConfig } from "@bera/berajs";
import { Footer, Header, TailwindIndicator } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import { beraJsConfig, navItems } from "./config";

const fontSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontHoney = Jua({
  weight: ["400"],
  variable: "--font-honey",
  subsets: ["latin"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans antialiased",
          fontSans.variable,
          fontHoney.variable,
        )}
      >
        <BeraConfig autoConnect={true} networkConfig={beraJsConfig}>
          <Header navItems={navItems} isHoney />
          <main className="w-full">{props.children}</main>
          <Toaster position="bottom-right" />
          <Footer />
          <TailwindIndicator />
          <Analytics />
        </BeraConfig>
      </body>
    </html>
  );
}
