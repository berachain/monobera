"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { BeraConfig } from "@bera/berajs";
import { Footer, Header, TailwindIndicator } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import { beraJsConfig, footNavigation, navItems } from "./config";

const fontSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <BeraConfig autoConnect={true} networkConfig={beraJsConfig}>
          <Header navItems={navItems} />
          <main className="w-full">{props.children}</main>
          <Toaster position="bottom-right" />
          <Footer navItem={footNavigation} />
          <TailwindIndicator />
          <Analytics />
        </BeraConfig>
      </body>
    </html>
  );
}
