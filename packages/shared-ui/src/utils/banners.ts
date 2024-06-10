import { bannerConfig } from "../banner-config";

export const getBannerCount = (appName: string, pathname: string) => {
  const activeBanners: string[] = [];
  if (appName) {
    const appConfig = bannerConfig[appName];
    if (appConfig) {
      Object.keys(appConfig).forEach((key) => {
        const banner = appConfig[key as keyof typeof appConfig];
        if (
          banner?.enabled &&
          (!banner.hrefs || banner.hrefs.includes(pathname))
        ) {
          activeBanners.push(key);
        }
      });
    }
  }
  const globalConfig = bannerConfig.global;
  if (globalConfig) {
    Object.keys(globalConfig).forEach((key) => {
      const banner = globalConfig[key as keyof typeof globalConfig];
      if (
        banner?.enabled &&
        (!banner.hrefs || banner.hrefs.includes(pathname)) &&
        !activeBanners.includes(key)
      ) {
        activeBanners.push(key);
      }
    });
  }

  return activeBanners.length;
};
