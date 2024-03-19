"use client";

import Script from "next/script";
import { bannerEnabled, perpsName } from "@bera/config";
import { UpTimeStatus, LaunchBanner } from "@bera/shared-ui";

// import { useReadLocalStorage } from "usehooks-ts";

// import { Disclaimer } from "../components/disclaimer";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const disclaimerAccepted = useReadLocalStorage<boolean | null>(
  //   "DISCLAIMER_ACCEPTED",
  // );
  return (
    <section className="h-full lg:h-[calc(100vh-106px)] flex flex-col">
      {bannerEnabled && <LaunchBanner appName={perpsName} />}
      {/* {!disclaimerAccepted && <Disclaimer />} */}
      <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
      />
      {children}
      <UpTimeStatus />
    </section>
  );
}
