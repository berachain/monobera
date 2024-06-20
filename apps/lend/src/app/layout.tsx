"use client";

import "@bera/ui/styles.css";
import "../styles/globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { lendName } from "@bera/config";
import {
  Header,
  TailwindIndicator,
  TermOfUseModal,
  getBannerCount,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

import Providers from "./Providers";
import { navItems } from "./config";
import { Suspense } from "react";
import { isBrowserRouterEnabled, routes, useRouterConfig, RouteDefinition } from "./RouteDefinitions";

const fontSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
});


export default function RootLayout(props: { children: React.ReactNode }) {
  const [firstTimeUser, setFirstTimeUser] = useLocalStorage(
    "FIRST_TIME_USER",
    true,
  );
  const pathName = usePathname();
  const activeBanners = getBannerCount(lendName, pathName);
  const Router = isBrowserRouterEnabled() ? BrowserRouter : HashRouter;
  const routerConfig = useRouterConfig()

  return (
    <html lang="en">
      <Script
        id="HotJarAnalytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3728407,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <TermOfUseModal open={firstTimeUser} setOpen={setFirstTimeUser} />
        <Providers>
          <Router>
            <div className="z-[100]">
              <Toaster position="bottom-right" />
            </div>
            <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
              <Header navItems={navItems} appName={lendName} />
              <main
                className="w-full"
                style={{ paddingTop: `${48 * activeBanners + 80}px` }}
              >
                <Suspense>
                  <Routes>
                    {routes.map((route: RouteDefinition) =>
            route.enabled(routerConfig) ? (
              <Route key={route.path} path={route.path} element={route.getElement(routerConfig)}>
                {route?.nestedPaths?.map((nestedPath) => (
                  <Route
                    path={nestedPath}
                    element={route.getElement(routerConfig)}
                    key={`${route.path}/${nestedPath}`}
                  />
                ))}
              </Route>
            ) : null
          )}
                  </Routes>
                </Suspense>
              </main>
            </div>
            <TailwindIndicator />
            <Analytics />
          </Router>
        </Providers>
      </body>
    </html>
  );
}
