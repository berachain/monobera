"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import { IBM_Plex_Sans, Jua } from "next/font/google";
import Script from "next/script";
import { ApolloProvider } from "@apollo/client";
import { honeyName } from "@bera/config";
import { honeyClient } from "@bera/graphql";
import {
  Footer,
  Header,
  MainWithBanners,
  TailwindIndicator,
  TermOfUseModal,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { BeraWagmi } from "@bera/wagmi";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import { mobileNavItems, navItems } from "./config";

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
      <Script
        id="HotJarAnalytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3728320,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
      <body
        className={cn(
          "font-sans antialiased",
          fontSans.variable,
          fontHoney.variable,
        )}
      >
        {" "}
        <TermOfUseModal />
        <ApolloProvider client={honeyClient}>
          <BeraWagmi>
            <Header
              isHoney
              navItems={navItems}
              mobileNavItems={mobileNavItems}
              appName={honeyName}
            />
            <MainWithBanners className="pt-start" appName={honeyName}>
              {props.children}
            </MainWithBanners>
            <Toaster position="bottom-right" />
            <Footer />
            <TailwindIndicator />
            <Analytics />
          </BeraWagmi>
        </ApolloProvider>
      </body>
    </html>
  );
}
