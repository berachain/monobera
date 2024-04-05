"use client";

import Script from "next/script";
import { bannerEnabled, perpsName } from "@bera/config";
import { LaunchBanner, UpTimeStatus } from "@bera/shared-ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-full flex-col lg:h-[calc(100vh-106px)]">
      {bannerEnabled && <LaunchBanner appName={perpsName} />}
      <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
      />
      {children}
      <UpTimeStatus />
    </section>
  );
}
