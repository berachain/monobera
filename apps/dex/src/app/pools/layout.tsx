"use client";

import { dexName } from "@bera/config";
import { CustomizedBanner } from "@bera/shared-ui";
import { FooterSM } from "@bera/shared-ui/src/footer";
import { DappBannerType, bannerConfig } from "@bera/wagmi";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {bannerConfig[dexName]?.[DappBannerType.SLOW]?.enabled && (
        <CustomizedBanner
          text={bannerConfig[dexName]?.[DappBannerType.SLOW]?.text}
        />
      )}
      <div className="container min-h-minimun max-w-1280 pb-16">{children}</div>
      <FooterSM />
    </section>
  );
}
