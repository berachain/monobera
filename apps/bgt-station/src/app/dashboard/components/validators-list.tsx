import React, { type ReactNode } from "react";
import { type PoLValidator } from "@bera/berajs";

import ValidatorCard, { SkeletonValidatorCard } from "./validator-card";

interface ValidatorsListProps {
  validators: PoLValidator[] | undefined;
  sortingAttr: string;
  title: ReactNode;
  message: string;
  isLoading?: boolean;
  keyword: string;
}

export function ValidatorsList({
  validators,
  sortingAttr,
  title,
  message,
  keyword,
  isLoading = true,
}: ValidatorsListProps) {
  return (
    <div className="h-fit">
      <div className="text-center text-3xl font-bold leading-[48px] text-foreground sm:text-5xl">
        {title}
      </div>
      <div className="mt-4 text-center text-lg font-semibold leading-7 text-muted-foreground sm:text-xl">
        {message}
      </div>
      <div className="mt-8 grid h-fit grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? [0, 0, 0, 0].map((_, index) => (
              <SkeletonValidatorCard key={index} />
            ))
          : validators?.map((validator: PoLValidator) => (
              <ValidatorCard
                validator={validator}
                key={validator.operatorAddr + sortingAttr}
                keyword={keyword}
              />
            ))}
      </div>
      {/* <div className="mt-8 flex justify-center">
        {(linesCount * 3 < (validators?.length ?? 0) ||
          linesCount < MAX_LINE_COUNT) && (
          <Button
            variant="outline"
            onClick={() => setLinesCount(linesCount + 1)}
          >
            View More
          </Button>
        )}
      </div> */}
    </div>
  );
}
