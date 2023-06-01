"use client";

import { useMemo, useState } from "react";
import {
  truncateHash,
  useActiveValidators,
  useDelegate,
  useGetRedelegations,
  useGetUnbondingDelegation,
  usePollAccountDelegation,
  usePollRawValidators,
  // usePollRedelegations,
  usePollUnbondingDelegation,
  useSelectedAccountDelegation,
  useUnDelegate,
} from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Input } from "@bera/ui/input";
import { useToast } from "@bera/ui/use-toast";

// Format normal units to base units for use on the EVM
const formatToBaseUnit = (amount: string, decimals: number): bigint => {
  if (!amount) return BigInt(0);
  try {
    const baseUnit = BigInt(10 ** decimals);
    const parsedAmount = BigInt(parseFloat(amount) * Number(baseUnit));
    return parsedAmount;
  } catch (e) {
    return BigInt(0);
  }
};

export default function ValidatorDetails() {
  const [input_amount, setInputAmount] = useState<string>("");
  const { toast } = useToast();
  usePollRawValidators();

  const validators = useActiveValidators();

  const validator = useMemo(() => {
    if (validators) {
      return validators[0];
    }
  }, [validators]);

  usePollAccountDelegation(validator);

  const delegatedAmount = useSelectedAccountDelegation(validator);

  usePollUnbondingDelegation(validator);
  const unboundingDelegations = useGetUnbondingDelegation(validator);
  console.log(unboundingDelegations);
  const redelegations = useGetRedelegations();

  const { delegate, isSuccess: isSuccesfulDelegation } = useDelegate(
    validator,
    formatToBaseUnit(input_amount, 18),
  );

  const { undelegate, isSuccess: isSuccessfulUnDelegation } = useUnDelegate(
    validator,
    formatToBaseUnit(input_amount, 18),
  );

  return (
    <Card className="w-full p-4 xl:w-[1000px]">
      <p>Validator Address:</p>
      <p>{validator ? truncateHash(validator) : ""}</p>
      <p>Delegated Amount</p>
      <p>{delegatedAmount ? delegatedAmount : "not delegating"} tBera</p>
      <p>Redelegations</p>
      <p>{redelegations.length ? redelegations.length : "No redelegations"}</p>
      <Input
        type="number"
        onChange={(e) => setInputAmount(e.target.value)}
        value={input_amount}
      />
      <Button
        onClick={() => {
          delegate();
          if (isSuccesfulDelegation) {
            toast({
              title: "Congratulations",
              description: "Successfully delegated",
              duration: 2000,
            });
          }
          setInputAmount("");
        }}
      >
        Stake
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          undelegate();
          if (isSuccessfulUnDelegation) {
            toast({
              title: "Congratulations",
              description: "Successfully undelegated",
              duration: 2000,
            });
          }
          setInputAmount("");
        }}
      >
        Un-Stake
      </Button>
    </Card>
  );
}
