"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { formatUsd } from "@bera/berajs";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import clsx from "clsx";
import { useInView } from "framer-motion";

import { usePositions, type Position } from "~/hooks/usePositions";

interface PositionProps extends Position {
  className?: string;
}

function Position({
  assets,
  current_price,
  position_size,
  className,
  ...props
}: PositionProps) {
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
            {assets}
          </div>
        </div>
        <div className="text-2xl font-semibold leading-normal text-popover-foreground">
          {formatUsd(current_price)}
        </div>

        <div className="mt-4 text-lg font-semibold leading-7 text-popover-foreground">
          {formatUsd(current_price * position_size)}
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

interface PositionRowProps {
  className?: string;
  positions: Position[];
  positionClassName?: (index: number) => string;
  msPerPixel?: number;
}

function PositionRow({
  className,
  positions,
  positionClassName,
  msPerPixel = 0,
}: PositionRowProps) {
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
      {positions.concat(positions).map((position, positionIndex) => (
        <Position
          key={positionIndex}
          aria-hidden={positionIndex >= positions.length}
          className={
            positionClassName &&
            positionClassName(positionIndex % positions.length)
          }
          {...position}
        />
      ))}
    </div>
  );
}

function PositionGrid() {
  const containerRef = useRef(null);
  const positions = usePositions();
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  //@ts-ignore
  const rows = splitArray(positions, 2);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-4 overflow-hidden "
    >
      {isInView && (
        <>
          <PositionRow
            // @ts-ignore
            positions={[...rows[0], ...rows[1]]}
            positionClassName={(positionIndex) =>
              clsx(
                // @ts-ignore
                positionIndex >= rows[0].length && "md:hidden",

                // @ts-ignore
                positionIndex >= rows[0].length && "lg:hidden",
              )
            }
            msPerPixel={10}
          />

          <PositionRow
            positions={[...rows[1], ...rows[0]]}
            // @ts-ignore
            positionClassName={(positionIndex) =>
              // @ts-ignore
              positionIndex >= rows[1].length && "lg:hidden"
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

export default function Positions() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="md:leading-14 px-8 text-center text-3xl font-extrabold leading-9 tracking-tight text-foreground md:text-5xl">
        <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
          On-Chain <br />
          Perpetuals
        </span>{" "}
        Done Right!
      </h2>
      <div className="mb-4 px-8 text-center text-base font-medium leading-normal text-muted-foreground md:text-sm">
        Featuring a wide variety of high volume assets, with new tokens added on
        a regular basis.
      </div>

      <PositionGrid />
      <Link className="mt-8 flex justify-center" href="/markets">
        <Button variant="secondary">View All Markets</Button>
      </Link>
    </section>
  );
}
