"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

import { Orbit } from "./orbit";

export default function BackGroundOrbit() {
  const { theme, systemTheme } = useTheme();
  const t = !theme || theme === "system" ? systemTheme || "dark" : theme;
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="absolute top-[-16%] z-[-1] block h-full w-full dark:hidden">
          <Image
            src="/globe_bright.png"
            alt="Globe"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="absolute top-[-16%] z-[-1] hidden h-full w-full dark:block">
          <Image
            src="/globe.png"
            alt="Globe"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="light:hidden absolute top-[-50%] z-[-2] h-[150%] w-full from-black via-[#1E0900] to-transparent dark:bg-gradient-to-t" />
        <div className="light:bg-gradient-to-t absolute top-[-50%] z-[-2] h-[150%] w-full from-white via-white to-transparent dark:hidden" />

        <div className="absolute top-[-18%] z-[-3] h-[100%] w-[100%] opacity-40">
          <Orbit radius={2} className="animate-orbit-spin" />
        </div>
        <div className="absolute top-[-15%] z-[-3] h-[100%] w-[100%] opacity-60">
          <Orbit radius={3} className="animate-orbit-spin-reverse" />
        </div>
        <div className="absolute top-[-12%] z-[-3] h-[100%] w-[100%] opacity-80">
          <Orbit radius={4} className="animate-orbit-spin" />
        </div>
      </div>
    </>
  );
}
