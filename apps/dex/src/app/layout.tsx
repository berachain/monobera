"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import dynamic from "next/dynamic";
import { IBM_Plex_Sans } from "next/font/google";
import Image from "next/image";
import Script from "next/script";
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
      <Script
        id="HotJarAnalytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3728271,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <Providers>
          <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
            <div className="z-[100]">
              <Toaster position="bottom-right" />
            </div>
            <div className="z-10 flex-1">
              <Header navItems={navItems} />
              <main className="min-h-screen w-full py-20">
                {props.children}
              </main>
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
