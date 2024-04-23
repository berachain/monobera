// src/hooks/useActiveBanners.js
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BannerProperty, bannerConfig } from "@bera/config";

export const useActiveBanners = () => {
  const pathname = usePathname();
  const [activeBanners, setActiveBanners] = useState<number>(0);

  useEffect(() => {
    let count = 0;
    const activeBanners = Object.keys(bannerConfig).reduce((acc, key) => {
      const banners = bannerConfig[key];
      if (banners) {
        Object.values(banners).forEach((banner: BannerProperty) => {
          if (
            banner.enabled &&
            (!banner.hrefs || banner.hrefs.includes(pathname))
          ) {
            count += 1;
          }
        });
      }
      return count;
    }, 0);

    setActiveBanners(activeBanners);
  }, [pathname]);

  return activeBanners;
};
