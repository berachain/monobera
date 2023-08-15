"use client";

import React, { useMemo, type ReactNode } from "react";
import { type Validator } from "@bera/berajs";
import { Button } from "@bera/ui/button";

import ValidatorCard from "./validator-card";

export function ValidatorsList({
  validators,
  title,
}: {
  validators: Validator[];
  title: ReactNode;
}) {
  const [linesCount, setLinesCount] = React.useState(1);
  const showingValidators = useMemo(
    () => validators.slice(0, linesCount * 3),
    [validators, linesCount],
  );
  return (
    <div>
      <div className="text-center text-5xl font-bold leading-[48px] text-foreground">
        {title}
      </div>
      <div className="text-muted-forergound mt-4 text-center text-xl font-semibold leading-7">
        Stake your BGT with the most popular validators
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {showingValidators.map((validator, index) => (
          <ValidatorCard validator={validator} key={index} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        {linesCount * 3 < validators.length && (
          <Button
            variant="secondary"
            onClick={() => setLinesCount(linesCount + 1)}
          >
            View More
          </Button>
        )}
      </div>
    </div>
  );
}
