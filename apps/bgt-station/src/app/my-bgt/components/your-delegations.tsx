import React from "react";
import {
  usePollDelegatorValidators,
  usePollGlobalValidatorBribes,
  usePollPrices,
  type PoLValidator,
} from "@bera/berajs";

import Nothing from "../nothing";
import ValidatorCard from "./validator-card";

export default function YourDelegations() {
  const { useDelegatorValidators, useTotalValidatorsDelegated } =
    usePollDelegatorValidators();
  const total = useTotalValidatorsDelegated();
  const delegatedValidators = useDelegatorValidators();

  const { usePrices } = usePollPrices();
  const { data: prices } = usePrices();
  const { useDelegatorPolValidators } = usePollGlobalValidatorBribes(prices);
  const delegatorPolValidators = useDelegatorPolValidators(
    delegatedValidators?.map((d: any) => d.operatorAddr),
  );

  return (
    <div>
      {total !== 0 && !Number.isNaN(total) ? (
        <div className="flex flex-col gap-3">
          {delegatorPolValidators?.map((validator: PoLValidator) => (
            <ValidatorCard validator={validator} key={validator.operatorAddr} />
          ))}
          {delegatorPolValidators?.length === 0 && (
            <p className="mt-4 self-center text-xl font-semibold">
              No BGT Delegated.
            </p>
          )}
        </div>
      ) : (
        <Nothing
          message={
            "This section will be populated once you have delegated to some validators. "
          }
        />
      )}
    </div>
  );
}
