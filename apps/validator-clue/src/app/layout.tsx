"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import { TailwindIndicator } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import Providers from "./Providers";
import Header from "./components/header";

const retroGaming = localFont({
  src: "../../public/fonts/retro-gaming/Retro-Gaming.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-retro-gaming",
});

const jetBrainsMono = localFont({
  src: [
    {
      path: "../../public/fonts/jet-brains-mono/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/jet-brains-mono/JetBrainsMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/jet-brains-mono/JetBrainsMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-jet-brains-mono",
});
export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(retroGaming.className, jetBrainsMono.className)}
    >
      <Script
        id="HotJarAnalytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3728319,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
      <body className="antialiased">
        <Providers>
          <div className="z-[100]">
            <Toaster position="bottom-right" />
          </div>
          <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
            <Header />
            <main>
              {props.children}
            </main>
          </div>
          <TailwindIndicator />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
