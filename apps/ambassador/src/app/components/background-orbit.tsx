"use client";

import Image from "next/image";
import { cn } from "@bera/ui";
import { useTheme } from "next-themes";

import { Orbit } from "./orbit";

export default function BackGroundOrbit() {
  const { theme, systemTheme } = useTheme();
  const t = theme === "system" ? systemTheme : theme;
  const bgGradient =
    t === "dark"
      ? "bg-gradient-to-t from-black via-[#1E0900] to-transparent"
      : "bg-gradient-to-t from-[bg-muted] via-white to-transparent";
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="absolute top-[-16%] h-full w-full">
          <Image
            src={t === "dark" ? "/globe.png" : "/globe_bright.png"}
            alt="Globe"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          className={cn(
            "absolute top-[-50%] z-[-2] h-[150%] w-full bg-gradient-to-t from-[var(--gradient-start)] to-[var(--gradient-end)]",
            bgGradient,
          )}
        />
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
