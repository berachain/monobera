import "../styles/globals.css";
import { IBM_Plex_Sans, Jua } from "next/font/google";
import Script from "next/script";
import { honeyName } from "@bera/config";
import {
  Footer,
  Header,
  MainWithBanners,
  TailwindIndicator,
  TermOfUseModal,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Toaster } from "react-hot-toast";

import { mobileNavItems, navItems } from "./config";
import HoneyProviders from "~/components/honey-providers";

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
        <HoneyProviders>
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
        </HoneyProviders>
      </body>
    </html>
  );
}
