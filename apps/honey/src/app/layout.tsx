"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { BeraConfig } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { beraJsConfig } from "./config";

const fontSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <BeraConfig autoConnect={true} networkConfig={beraJsConfig}>
          <Header />
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
