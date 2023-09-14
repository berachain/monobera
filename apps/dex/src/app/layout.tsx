"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import dynamic from "next/dynamic";
import { IBM_Plex_Sans } from "next/font/google";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Footer, Header, TailwindIndicator } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import { navItems } from "~/app/config";
import Providers from "./Providers";

const fontSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
});

const Gradient = dynamic(
  () => import("@bera/shared-ui").then((mod) => mod.Gradient),
  {
    ssr: false,
    loading: () => <></>,
  },
);

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
              <main className="min-h-screen w-full py-20">
                {props.children}
              </main>
              <Toaster position="bottom-right" />
              <Footer />
            </div>

            <Gradient
              lightUrl={`${cloudinaryUrl}/shared/xrvkmr8yhvvyckxznty2`}
              darkUrl={`${cloudinaryUrl}/shared/klszfo1j2sz9yk7lin87`}
            />
            <Image
              className="fixed bottom-0 left-1/2 right-0 h-[300px] -translate-x-1/2 object-cover"
              src={`${cloudinaryUrl}/shared/qfyewc7lo2ujtktbimd8`}
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
