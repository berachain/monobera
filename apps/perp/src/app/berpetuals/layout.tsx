"use client";

import Script from "next/script";
import { bannerEnabled, perpsName } from "@bera/config";
import { UpTimeStatus, LaunchBanner, CustomizedBanner } from "@bera/shared-ui";

// import { useReadLocalStorage } from "usehooks-ts";

// import { Disclaimer } from "../components/disclaimer";
import { OneClickBanner } from "./components/one-click-banner";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const disclaimerAccepted = useReadLocalStorage<boolean | null>(
  //   "DISCLAIMER_ACCEPTED",
  // );
  return (
    <section className="relative">
      {bannerEnabled && <LaunchBanner appName={perpsName} />}
      <CustomizedBanner
        className="mb-8 mt-0"
        text="Scheduled Maintenance: Berps will undergo system updates on Feb 13th, 7:00PM to 8:00PM UTC. Please wind down open positions."
      />
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
