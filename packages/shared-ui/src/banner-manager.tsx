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

  const customizedBannerText = (
    <div className="md:text-md text-sm font-semibold leading-tight">
      We are currently experiencing network congestion in our system, please be
      patient with us.
    </div>
  );

  return (
    <>
      {shouldShowBanner(DappBannerType.LAUNCH, appNameOrDefault) &&
        bannerConfig[appNameOrDefault]?.[DappBannerType.LAUNCH].bannerComponent}
      {shouldShowBanner(DappBannerType.RPC, appNameOrDefault) &&
        bannerConfig[appNameOrDefault]?.[DappBannerType.RPC].bannerComponent}
      {shouldShowBanner(DappBannerType.SLOW, appNameOrDefault) &&
        bannerConfig[appNameOrDefault]?.[DappBannerType.SLOW].bannerComponent}
    </>
  );
};

export default BannerManager;
