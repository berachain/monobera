"use client";

import Image from "next/image";
import { cn } from "@bera/ui";
import { useTheme } from "next-themes";

import { Orbit } from "./orbit";

export default function BackGroundOrbit() {
  const { theme, systemTheme } = useTheme();

  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-t from-black via-black to-transparent"
      : "bg-gradient-to-t from-white via-white to-transparent";
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="absolute top-[-16%] h-full w-full">
          <Image
            src={theme === "dark" ? "/globe.png" : "/globe_bright.png"}
            alt="Globe"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          className={cn(
            "absolute top-[-5%] z-[-2] h-[100%] w-full",
            bgGradient,
          )}
        />
        <div className="absolute top-[-18%] z-[-3] h-[100%] w-[100%] opacity-40">
          <Orbit radius={2} className="animate-spin-slowly" />
        </div>
        <div className="absolute top-[-15%] z-[-3] h-[100%] w-[100%] opacity-60">
          <Orbit radius={3} className="animate-spin-reverse-slowly" />
        </div>
        <div className="absolute top-[-12%] z-[-3] h-[100%] w-[100%] opacity-80">
          <Orbit radius={4} className="animate-spin-slowly" />
        </div>
      </div>
    </>
  );
}
