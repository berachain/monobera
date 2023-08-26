import React from "react";
import { usePollDelegatorValidators, type Validator } from "@bera/berajs";

import Nothing from "../nothing";
import ValidatorCard from "./validator-card";

export default function YourDelegations() {
  const { useDelegatorValidators, useTotalValidatorsDelegated } =
    usePollDelegatorValidators();
  const total = useTotalValidatorsDelegated();
  const validators = useDelegatorValidators();
  const validValidators = validators;

  return (
    <div>
      {total !== 0 ? (
        <div className="flex flex-col gap-3">
          {validValidators?.map((validator: Validator) => (
            <ValidatorCard
              validator={validator}
              key={validator.operatorAddress}
            />
          ))}
          {validValidators?.length === 0 && (
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
