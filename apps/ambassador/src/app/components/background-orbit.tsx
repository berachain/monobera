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
      : "bg-white";
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="absolute top-[-18%] h-full w-full">
          <Image
            src="/globe.png"
            alt="Globe"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          className={cn("absolute top-[5%] z-[-2] h-[50%] w-full", bgGradient)}
        ></div>
        <div className="absolute top-[-19%] z-[-3] h-[100%] w-[100%] opacity-40">
          <Orbit radius={2} className="animate-spin-slowly" />
        </div>
        <div className="absolute top-[-18%] z-[-3] h-[100%] w-[100%] opacity-60">
          <Orbit radius={3} className="animate-spin-reverse-slowly" />
        </div>
        <div className="absolute top-[-17%] z-[-3] h-[100%] w-[100%] opacity-80">
          <Orbit radius={4} className="animate-spin-slowly" />
        </div>
      </div>
    </>
  );
}
