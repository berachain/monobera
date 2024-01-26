"use client";

import Script from "next/script";
import { bannerEnabled } from "@bera/config";
import { UpTimeStatus } from "@bera/shared-ui";
import { BerpsBanner } from "@bera/shared-ui/src/launch-banner";

// import { useReadLocalStorage } from "usehooks-ts";

// import { Disclaimer } from "../components/disclaimer";
import { OneClickBanner } from "./components/one-click-banner";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const disclaimerAccepted = useReadLocalStorage<boolean | null>(
  //   "DISCLAIMER_ACCEPTED",
  // );
  return (
    <section className="relative">
      {bannerEnabled && <BerpsBanner appName={""} />}
      {/* {!disclaimerAccepted && <Disclaimer />} */}
      <OneClickBanner />
      <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
      />
      {children}
      <UpTimeStatus />
    </section>
  );
}
