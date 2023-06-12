"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { BeraConfig } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import { Header } from "~/components/header";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { beraConfig } from "~/config/beraJs";

const fontSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#1A1A1A]">
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <BeraConfig networkConfig={beraConfig} autoConnect={true}>
          <div className="relative flex min-h-screen flex-col overflow-hidden bg-[url('/honeybg.jpg')] bg-cover bg-center">
            <div className="flex-1">
              <Header />
              <main className=" w-full py-40">{props.children}</main>
              <Toaster position="bottom-right" />
            </div>
          </div>
          <TailwindIndicator />

          <Analytics />
        </BeraConfig>
      </body>
    </html>
  );
}
