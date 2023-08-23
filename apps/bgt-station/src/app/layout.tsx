"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import Image from "next/image";
import { Footer, Header, TailwindIndicator } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import Providers from "./Providers";
import { footerNavigation, navItems } from "./config";

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
        <Providers>
          <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
            <div className="z-10 flex-1">
              <Header navItems={navItems} />
              <main className="w-full pt-40">{props.children}</main>
              <Toaster position="bottom-right" />
              <Footer navItem={footerNavigation} />
            </div>
            <Image
              className="fixed left-1/2 right-0 top-0 -translate-x-1/2"
              src="/bg/variant.svg"
              alt="bera variant"
              width={1078}
              height={820}
            />
            <Image
              className="fixed bottom-0 left-1/2 right-0 h-[300px] -translate-x-1/2 object-cover"
              src="/bg/bera-banner.png"
              alt="bera banner"
              width={2000}
              height={300}
            />
          </div>
          <TailwindIndicator />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
