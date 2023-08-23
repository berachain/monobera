"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { TailwindIndicator } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import Providers from "./Providers";

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
          <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
            <Header />
            <main className="w-full">{props.children}</main>
            <Toaster position="bottom-right" />
            <Footer />
          </div>
          <TailwindIndicator />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
