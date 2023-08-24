"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export function BearBG({
  lightUrl,
  darkUrl,
}: {
  lightUrl: string;
  darkUrl: string;
}) {
  const { theme, systemTheme } = useTheme();
  const light = (theme === "system" ? systemTheme : theme) === "light";
  return light ? (
    <Image
      className="fixed bottom-0 left-1/2 right-0 h-[300px] -translate-x-1/2 object-cover"
      src={lightUrl}
      alt="bera banner"
      width={2000}
      height={300}
    />
  ) : (
    <Image
      className="fixed bottom-0 left-1/2 right-0 h-[300px] -translate-x-1/2 object-cover"
      src={darkUrl}
      alt="bera banner"
      width={2000}
      height={300}
    />
  );
}
