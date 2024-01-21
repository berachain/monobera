"use client";

import Script from "next/script";
import { UpTimeStatus } from "@bera/shared-ui";
import { OneClickBanner } from "./components/one-click-banner";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <section className="relative">

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
