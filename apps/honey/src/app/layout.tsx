"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import { IBM_Plex_Sans, Jua } from "next/font/google";
import Script from "next/script";
import { ApolloProvider } from "@apollo/client";
import { BeraConfig } from "@bera/berajs";
import { rpcBannerEnabled } from "@bera/config";
import { honeyClient } from "@bera/graphql";
import {
  Footer,
  Header,
  TailwindIndicator,
  TermOfUseModal,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { SWRDevTools } from "swr-devtools";
import { useLocalStorage } from "usehooks-ts";

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
  const [firstTimeUser, setFirstTimeUser] = useLocalStorage(
    "FIRST_TIME_USER",
    true,
  );
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
      <SWRDevTools>
        <body
          className={cn(
            "font-sans antialiased",
            fontSans.variable,
            fontHoney.variable,
          )}
        >
          {" "}
          <TermOfUseModal open={firstTimeUser} setOpen={setFirstTimeUser} />
          <ApolloProvider client={honeyClient}>
            <BeraConfig>
              <Header
                isHoney
                navItems={navItems}
                mobileNavItems={mobileNavItems}
              />
              <main
                className={cn(
                  "w-full pb-[72px]",
                  rpcBannerEnabled ? "pt-[120px]" : "pt-[72px]",
                )}
              >
                {props.children}
              </main>
              <Toaster position="bottom-right" />
              <Footer />
              <TailwindIndicator />
              <Analytics />
            </BeraConfig>
          </ApolloProvider>
        </body>
      </SWRDevTools>
    </html>
  );
}
