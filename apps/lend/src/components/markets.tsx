"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { formatUsd, formatter, usePollReservesDataList } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import clsx from "clsx";
import { useInView } from "framer-motion";

interface MarketColumnProps {
  className?: string;
  markets: any[];
  marketClassName?: (index: number) => string;
  msPerPixel?: number;
}

function Market({
  market,
  className,
  ...props
}: {
  market: any;
  className?: string;
}) {
  const animationDelay = useMemo(() => {
    const possibleAnimationDelays = [
      "0s",
      "0.1s",
      "0.2s",
      "0.3s",
      "0.4s",
      "0.5s",
    ];
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ];
  }, []);

  return (
    <figure
      className={clsx(
        "rounded-xl border border-border bg-muted p-6 shadow-md shadow-foreground/5 ",
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-foreground">
        <div className="flex items-center gap-2">
          <TokenIcon address={market.underlyingAsset} fetch size="xl" />
          <p className="text-xl font-semibold uppercase text-muted-foreground">
            {market.symbol}
          </p>
        </div>

        <p className="mt-4 text-3xl font-bold leading-6">
          $
          {formatter.format(
            Number(market.totalLiquidity) *
              Number(market.formattedPriceInMarketReferenceCurrency),
          )}
        </p>
        <p className="mt-2">
          <span className="flex items-center gap-2 uppercase text-foreground">
            {Number(market.totalLiquidity).toLocaleString()} {market.symbol}
          </span>
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Current Token Price
        </p>
        <p className="mt-1 text-sm font-bold text-muted-foreground">
          {formatUsd(Number(market.formattedPriceInMarketReferenceCurrency))}
        </p>
      </blockquote>
    </figure>
  );
}

function MarketColumn({
  className,
  markets,
  msPerPixel = 0,
}: MarketColumnProps) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;
    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight || 0);
    });
    resizeObserver.observe(columnRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={clsx("animate-marquee space-y-4 py-2", className)}
      // @ts-expect-error - No types
      style={{ "--marquee-duration": duration }}
    >
      {markets.map((market, marketIndex) => (
        <Market
          key={marketIndex}
          aria-hidden={marketIndex >= markets.length}
          // @ts-ignore
          className={marketIndex % markets.length}
          market={market}
        />
      ))}
    </div>
  );
}

function generateArrays(originalArray: any[], length: number) {
  const result = [];
  for (let i = 0; i < originalArray.length; i++) {
    const newArray = [];
    for (let j = 0; j < length; j++) {
      newArray.push(originalArray[(i + j) % originalArray.length]);
    }
    result.push(newArray);
  }

  return result;
}

function MarketGrid() {
  const containerRef = useRef(null);
  const { useReservesDataList } = usePollReservesDataList();
  const { data } = useReservesDataList();
  const markets = Object.keys(data ?? {}).map((key) => data[key]);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = generateArrays(markets, 20) as [any[], any[], any[]];

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[472px] max-h-[100vh] grid-cols-1 items-start gap-4 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 "
    >
      {isInView && markets.length > 0 && (
        <>
          <MarketColumn markets={columns[0]} msPerPixel={10} />
          <MarketColumn
            markets={columns[1]}
            className="hidden md:block"
            msPerPixel={15}
          />
          <MarketColumn
            markets={columns[2]}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50 dark:from-stone-950" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 dark:from-stone-950" />
    </div>
  );
}

export default function Markets() {
  return (
    <section
      id="markets"
      aria-labelledby="markets-title"
      className="pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <div className="container max-w-[1000px] ">
        <h2 className="mt-2 text-center text-5xl font-extrabold leading-8 tracking-tight text-foreground sm:text-4xl">
          <span className="bg-gradient-to-b from-yellow-300 to-orange-600 bg-clip-text text-transparent">
            BEND
          </span>{" "}
          Markets
        </h2>

        <MarketGrid />
        <Link className="mt-16 flex justify-center" href={"/dashboard"}>
          <Button variant={"outline"}>View all markets</Button>
        </Link>
      </div>
    </section>
  );
}
