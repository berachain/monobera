"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { perpsName } from "@bera/config";
import { UpTimeStatus, getBannerCount } from "@bera/shared-ui";
import { cn } from "@bera/ui";

const DYNAMIC_APP_HEIGHTS: { [key: number]: string } = {
  0: "lg:h-[calc(100vh-106px)]", // 0 banners
  1: "lg:h-[calc(100vh-154px)]", // 1 banner
  2: "lg:h-[calc(100vh-202px)]", // 2 banners
  3: "lg:h-[calc(100vh-250px)]", // 3 banners
  4: "lg:h-[calc(100vh-298px)]", // 4 banners
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const activeBanners = getBannerCount(perpsName, pathName);

  return (
    <section
      className={cn(
        "flex h-full flex-col",
        `${DYNAMIC_APP_HEIGHTS[activeBanners ?? 0]}`,
      )}
    >
      <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
      />
      {children}
      <UpTimeStatus />
    </section>
  );
}
