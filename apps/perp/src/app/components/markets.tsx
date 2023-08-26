"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { formatUsd } from "@bera/berajs";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import clsx from "clsx";
import { useInView } from "framer-motion";

import { useMarkets, type Market } from "~/hooks/useMarkets";

interface MarketProps extends Market {
  className?: string;
}

function Market({ title, dailyBorrows, className, ...props }: MarketProps) {
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
        "h-[146px] w-[152px] flex-shrink-0 rounded-2xl border border-border bg-background p-4",
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-foreground">
        <div className="flex items-center gap-1">
          <Avatar className="h-4 w-4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>token icon</AvatarFallback>
          </Avatar>
          <div className="text-sm font-medium leading-normal text-muted-foreground">
            {title}
          </div>
        </div>
        <div className="text-2xl font-semibold leading-normal text-popover-foreground">
          {formatUsd(15.56)}
        </div>

        <div className="mt-4 text-lg font-semibold leading-7 text-popover-foreground">
          {formatUsd(dailyBorrows)}
        </div>
        <div className="text-xs font-normal leading-3 text-muted-foreground">
          Open Interest (24H)
        </div>
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
    } // @ts-expect-error - No types
    result[index].push(array[i]);
  }
  return result;
}

interface MarketRowProps {
  className?: string;
  markets: Market[];
  marketClassName?: (index: number) => string;
  msPerPixel?: number;
}

function MarketRow({
  className,
  markets,
  marketClassName,
  msPerPixel = 0,
}: MarketRowProps) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [rowWidth, setRowWidth] = useState(0);
  const duration = `${rowWidth * 4 * msPerPixel}ms`;

  useEffect(() => {
    if (!rowRef.current) return;
    const resizeObserver = new window.ResizeObserver(() => {
      setRowWidth(rowRef.current?.offsetWidth || 0);
    });

    resizeObserver.observe(rowRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className={clsx("flex animate-marquee-x space-x-4", className)}
      style={{
        // @ts-expect-error - No types
        "--marquee-duration": duration,
      }}
    >
      {markets.concat(markets).map((market, marketIndex) => (
        <Market
          key={marketIndex}
          aria-hidden={marketIndex >= markets.length}
          className={
            marketClassName && marketClassName(marketIndex % markets.length)
          }
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
  const rows = splitArray(markets, 2);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-4 overflow-hidden "
    >
      {isInView && (
        <>
          <MarketRow
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            markets={[...rows[0], ...rows[1]]}
            marketClassName={(marketIndex) =>
              clsx(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                marketIndex >= rows[0].length && "md:hidden",
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                marketIndex >= rows[0].length && "lg:hidden",
              )
            }
            msPerPixel={10}
          />

          <MarketRow
            markets={[...rows[1], ...rows[0]]}
            className="hidden md:flex"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            marketClassName={(marketIndex) =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              marketIndex >= rows[1].length && "lg:hidden"
            }
            msPerPixel={15}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-[120px] bg-gradient-to-l from-background" />
      <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-[120px] bg-gradient-to-r from-background" />
    </div>
  );
}

export default function Markets() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="leading-14 text-center text-5xl font-extrabold tracking-tight text-foreground">
        <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
          On-Chain <br />
          Perpetuals
        </span>{" "}
        Done Right!
      </h2>
      <div className="mb-4 text-center text-base font-medium leading-normal text-muted-foreground">
        Featuring a wide variety of high volume assets, with new tokens added on
        a regular basis.
      </div>

      <MarketGrid />
      <div className="mt-8 flex justify-center">
        <Button variant="secondary">View All Markets</Button>
      </div>
    </section>
  );
}
