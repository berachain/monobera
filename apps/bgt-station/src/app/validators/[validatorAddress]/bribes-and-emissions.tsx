import React from "react";
import {
  // formatUsd,
  // usePollActiveValidators,
  usePollValidatorBribes,
} from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { type Address } from "viem";

import BribeList, { BribeCardLoading } from "./bribe-list";

export default function BribesAndEmissions({
  // historicalBribes,
  // cumulativeBribeValue,
  // currentBribeValue,
  validatorAddress,
}: {
  currentBribeValue: number;
  validatorAddress: Address;
}) {
  const { useActiveValidatorBribes, isLoading: isBribesLoading } =
    usePollValidatorBribes(validatorAddress);

  // const { useValidatorTokens } = usePollActiveValidators();
  // const totalDelegated = useValidatorTokens(validatorAddress);
  // const amountPerBgt = useMemo(() => {
  //   const amnt = Number(currentBribeValue) / totalDelegated;
  //   if (Number.isNaN(amnt)) {
  //     return 0;
  //   }
  //   return Number(currentBribeValue) / totalDelegated;
  // }, [totalDelegated, currentBribeValue]);

  const bribes = useActiveValidatorBribes();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1 text-lg font-semibold leading-7">
        Bribes
        <Tooltip text="Overview of bribe information on this validator" />
      </div>
      {isBribesLoading ? (
        <div>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {[0, 0, 0].map((_: any, index: number) => (
              <BribeCardLoading key={index} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {bribes.length === 0 ? (
            <div className="flex items-center gap-4 py-4">
              <hr className="h-[2px] flex-1" />
              <div className="text-sm text-muted-foreground">
                This validator has no bribes
              </div>
              <hr className="h-[2px] flex-1" />
            </div>
          ) : (
            <>
              <BribeList bribes={[bribes ?? []]} />
            </>
          )}
        </>
      )}
    </div>
  );
}
