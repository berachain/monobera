"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { DappBannerType, bannerConfig } from "./bannerConfig";

interface BannerManagerProps {
  appName: string | undefined;
}

const BannerManager = ({ appName }: BannerManagerProps) => {
  const pathname = usePathname();

  const shouldShowBanner = (type: DappBannerType, appName: string) => {
    const globalBanner = bannerConfig.global?.[type];
    const appBanner = bannerConfig[appName]?.[type];

    const isGlobalEnabled =
      globalBanner?.enabled &&
      (!globalBanner.hrefs || globalBanner.hrefs.includes(pathname));
    const isAppEnabled =
      appBanner?.enabled &&
      (!appBanner.hrefs || appBanner.hrefs.includes(pathname));

    return isGlobalEnabled || isAppEnabled;
  };

  const appNameOrDefault = appName || "Berachain Dapps";

  return (
    <>
      <div className="sticky pt-[74px]">
        {Object.values(DappBannerType).map((type) => (
          <div key={type}>
            {shouldShowBanner(type, appNameOrDefault) &&
              bannerConfig[appNameOrDefault]?.[type]?.bannerComponent}
          </div>
        ))}
      </div>
    </>
  );
};

export default BannerManager;
