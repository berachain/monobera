"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { formatUsd } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import clsx from "clsx";
import { useInView } from "framer-motion";

import { useMarkets, type Market } from "~/app/hooks/useMarkets";

interface MarketProps extends Market {
  className?: string;
}

function Market({
  title,
  icon,
  totalSupply,
  dailyPercentChange,
  dailyBorrows,
  className,
  ...props
}: MarketProps) {
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
        "rounded-3xl bg-white p-6 shadow-md shadow-foreground/5",
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-foreground">
        <div className="flex items-center gap-4">
          <Image
            src={icon}
            alt={title}
            className="rounded-full"
            width={32}
            height={32}
          />
          <p className="text-xl text-muted-foreground">{title}</p>
        </div>

        <p className="mt-8 text-3xl font-bold leading-6">
          {formatUsd(totalSupply)}
        </p>
        <p className="mt-2">
          {dailyPercentChange > 0 ? (
            <span className="flex items-center gap-2 text-green-500">
              +{dailyPercentChange}% (24H)
            </span>
          ) : (
            <span className="flex items-center gap-2 text-red-500">
              -{dailyPercentChange}% (24H)
            </span>
          )}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">Borrows (24H)</p>
        <p className="mt-1 text-sm font-bold text-muted-foreground">
          {formatUsd(dailyBorrows)}
        </p>
      </blockquote>
    </figure>
  );
}

function splitArray<T>(array: T[], numParts: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }

    // @ts-expect-error - No types
    result[index].push(array[i]);
  }
  return result;
}

interface MarketColumnProps {
  className?: string;
  markets: Market[];
  marketClassName?: (index: number) => string;
  msPerPixel?: number;
}

function MarketColumn({
  className,
  markets,
  // @ts-expect-error - No types
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  marketClassName = () => {},
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
      className={clsx("animate-marquee space-y-8 py-4", className)}
      // @ts-expect-error - No types
      style={{ "--marquee-duration": duration }}
    >
      {markets.concat(markets).map((market, marketIndex) => (
        <Market
          key={marketIndex}
          aria-hidden={marketIndex >= markets.length}
          className={marketClassName(marketIndex % markets.length)}
          {...market}
        />
      ))}
    </div>
  );
}

function MarketGrid() {
  const containerRef = useRef(null);
  const markets = useMarkets();

  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  let columns = splitArray(markets, 3);
  // @ts-expect-error - No types
  columns = [columns[0], columns[1], splitArray(columns[2], 2)];

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <MarketColumn
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            markets={[...columns[0], ...columns[2].flat(), ...columns[1]]}
            marketClassName={(marketIndex) =>
              clsx(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                marketIndex >= columns[0].length + columns[2][0].length &&
                  "md:hidden",

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                marketIndex >= columns[0].length && "lg:hidden",
              )
            }
            msPerPixel={10}
          />
          <MarketColumn
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            markets={[...columns[1], ...columns[2][1]]}
            className="hidden md:block"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            marketClassName={(marketIndex) =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              marketIndex >= columns[1].length && "lg:hidden"
            }
            msPerPixel={15}
          />
          <MarketColumn
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            markets={columns[2].flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
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
      <div className="container">
        <h2 className="mt-2 text-center text-3xl font-extrabold leading-8 tracking-tight text-foreground sm:text-4xl">
          <span className="bg-gradient-to-b from-yellow-300 to-orange-600 bg-clip-text text-transparent">
            BAAVE
          </span>{" "}
          Markets
        </h2>

        <MarketGrid />
        <div className="mt-16 flex justify-center">
          <Button variant={"secondary"}>View all markets</Button>
        </div>
      </div>
    </section>
  );
}
