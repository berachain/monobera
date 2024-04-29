"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import Hero from "~/components/hero";
import { HoneyMachine } from "~/components/honey-machine";
import { SwapCard } from "~/components/swap-card";

export default function HoneyPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const arcade = resolvedTheme === "dark";

  useEffect(() => {
    if (window?.innerWidth) {
      if (window.innerWidth < 1280 && arcade) setTheme("light");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (arcade && window?.innerWidth < 1280) setTheme("light");
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [arcade]);

  if (arcade && typeof window !== "undefined" && window?.innerWidth < 1280) {
    setTheme("light");
  }

  return (
    <section>
      {arcade ? (
        <div className="m-auto block max-w-[1200px]">
          <HoneyMachine />
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center justify-between gap-8 px-4 py-16">
          <Hero />
          <SwapCard />
        </div>
      )}
    </section>
  );
}
