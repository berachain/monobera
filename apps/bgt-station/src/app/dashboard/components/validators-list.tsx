import React, { type ReactNode } from "react";
import { type PoLValidator } from "@bera/berajs";
import { Button } from "@bera/ui/button";

import ValidatorCard, { SkeletonValidatorCard } from "./validator-card";

const MAX_LINE_COUNT = 2;
interface ValidatorsListProps {
  validators: PoLValidator[] | undefined;
  sortingAttr: string;
  title: ReactNode;
  message: string;
  isLoading?: boolean;
}

export function ValidatorsList({
  validators,
  sortingAttr,
  title,
  message,
  isLoading = true,
}: ValidatorsListProps) {
  const [linesCount, setLinesCount] = React.useState(1);
  const sortedValidators = validators
    ? [...validators]
        .sort(
          (a: PoLValidator, b: PoLValidator) =>
            Number((b as any)[sortingAttr]) - Number((b as any)[sortingAttr]),
        )
        .slice(
          0,
          validators.length > linesCount * 3
            ? linesCount * 3
            : validators.length,
        )
    : [];

  return (
    <div>
      <div className="text-center text-3xl font-bold leading-[48px] text-foreground sm:text-5xl">
        {title}
      </div>
      <div className="mt-4 text-center text-lg font-semibold leading-7 text-muted-foreground sm:text-xl">
        {message}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {isLoading
          ? [0, 0, 0].map((_, index) => <SkeletonValidatorCard key={index} />)
          : sortedValidators.map((validator: PoLValidator) => (
              <ValidatorCard
                validator={validator}
                key={validator.operatorAddr + sortingAttr}
              />
            ))}
      </div>
      <div className="mt-8 flex justify-center">
        {(linesCount * 3 < (validators?.length ?? 0) ||
          linesCount < MAX_LINE_COUNT) && (
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
