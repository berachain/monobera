"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Hero from "~/components/hero";
import { HoneyMachine } from "~/components/honey-machine";
import { SwapCard } from "~/components/swap-card";

export default function HoneyPage({ arcade = false }: { arcade: boolean }) {
  useEffect(() => {
    if (window?.innerWidth) {
      if (window.innerWidth < 1000 && arcade) {
        router.push("/?mode=pro");
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (arcade && window?.innerWidth < 1000) {
        router.push("/?mode=pro");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [arcade]);

  const router = useRouter();

  if (arcade && typeof window !== "undefined" && window?.innerWidth < 1000) {
    router.push("/?mode=pro");
  }

  return (
    <section>
      {arcade ? (
        <div className="m-auto block max-w-[1000px]">
          <HoneyMachine />
          {/* <HoneyBanner /> */}
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center justify-between gap-8 px-4 py-16">
          <Hero />
          <SwapCard showBear={false} />
        </div>
      )}
    </section>
  );
}
