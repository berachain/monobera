"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

import { cloudinaryUrl } from "~/config";

export function WeRBack() {
  const { theme, systemTheme } = useTheme();
  const light = (theme === "system" ? systemTheme : theme) === "light";
  return light ? (
    <Image
      className="mx-auto"
      src={`${cloudinaryUrl}/DEX/create-pool-lightcreate-pool_e7mlfb`}
      alt="Create a pool screenshot"
      width={400}
      height={889}
    />
  ) : (
    <Image
      className="mx-auto"
      src={`${cloudinaryUrl}/DEX/create-pool-darkcreate-pool_yiaqb5`}
      alt="Create a pool screenshot"
      width={400}
      height={889}
    />
  );
}
