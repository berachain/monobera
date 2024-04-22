"use client";

import { dexName } from "@bera/config";
import { CustomizedBanner } from "@bera/shared-ui";
import { FooterSM } from "@bera/shared-ui/src/footer";
import { DappBannerType, bannerConfig } from "@bera/wagmi";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="dex-background relative -mt-12">
      {bannerConfig[dexName]?.[DappBannerType.SLOW]?.enabled && (
        <CustomizedBanner
          text={bannerConfig[dexName]?.[DappBannerType.SLOW]?.text}
        />
      )}
      <div className="container relative z-10 min-h-[calc(100vh-144px)] max-w-1280 pb-16 pt-24">
        {children}
      </div>
      <FooterSM />
    </section>
  );
}
