"use client";

import Script from "next/script";
import { UpTimeStatus } from "@bera/shared-ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-full flex-col lg:h-[calc(100vh-106px)]">
      <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
      />
      {children}
      <UpTimeStatus />
    </section>
  );
}
