"use client";

import React, { useMemo, type ReactNode } from "react";
import { type PoLValidator } from "@bera/berajs";
import { Button } from "@bera/ui/button";

import ValidatorCard, { SkeletonValidatorCard } from "./validator-card";

export function ValidatorsList({
  validators,
  title,
  isLoading,
}: {
  validators: PoLValidator[] | undefined;
  title: ReactNode;
  isLoading?: boolean;
}) {
  const [linesCount, setLinesCount] = React.useState(1);
  const showingValidators = useMemo(
    () => validators?.slice(0, linesCount * 3),
    [validators, linesCount],
  );
  return (
    <div>
      <div className="text-center text-3xl font-bold leading-[48px] text-foreground sm:text-5xl">
        {title}
      </div>
      <div className="mt-4 text-center text-lg font-semibold leading-7 text-muted-foreground sm:text-xl">
        Stake your BGT with the most popular validators
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {isLoading
          ? [0, 0, 0].map((_, index) => <SkeletonValidatorCard key={index} />)
          : showingValidators?.map((validator, index) => (
              <ValidatorCard validator={validator} key={index} />
            ))}
      </div>
      <div className="mt-8 flex justify-center">
        {linesCount * 3 < (validators?.length ?? 0) && (
          <Button
            variant="outline"
            onClick={() => setLinesCount(linesCount + 1)}
          >
            View More
          </Button>
        )}
      </div>
    </div>
  );
}
