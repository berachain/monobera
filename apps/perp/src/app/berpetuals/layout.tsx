"use client";

import Script from "next/script";
import { UpTimeStatus } from "@bera/shared-ui";

// import { useReadLocalStorage } from "usehooks-ts";

// import { Disclaimer } from "../components/disclaimer";
import { OneClickBanner } from "./components/one-click-banner";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const disclaimerAccepted = useReadLocalStorage<boolean | null>(
  //   "DISCLAIMER_ACCEPTED",
  // );
  return (
    <section className="relative">
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
