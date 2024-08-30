"use client";

import { FC, HTMLProps, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@bera/ui";

import { getBannerCount } from "./utils";

export const MainWithBanners: FC<
  PropsWithChildren<{ appName: string; paddingTop?: number }> &
    HTMLProps<HTMLDivElement>
> = ({ appName, children, paddingTop = 72, className, ...props }) => {
  const pathName = usePathname();
  const activeBanners = getBannerCount(appName, pathName);

  return (
    <main
      className={cn("w-full", className)}
      {...props}
      style={{
        paddingTop: `${48 * activeBanners + paddingTop}px`,
        ...props.style,
      }}
    >
      {children}
    </main>
  );
};
