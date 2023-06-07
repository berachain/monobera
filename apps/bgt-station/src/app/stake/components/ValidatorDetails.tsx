"use client";

import { useMemo, useState } from "react";
import {
  truncateHash,
  useActiveValidators,
  useGetRedelegations,
  useGetUnbondingDelegation,
  usePollAccountDelegation,
  usePollRawValidators,
  usePollUnbondingDelegation,
  useSelectedAccountDelegation,
  useUnDelegate,
} from "@bera/berajs";
import { STAKING_PRECOMPILE_ABI } from "@bera/berajs/src/config";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Input } from "@bera/ui/input";
import { useToast } from "@bera/ui/use-toast";

import { useTxn } from "~/hooks/usTxn";

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

  const { write, isLoading } = useTxn({
    message: `Delegate ${input_amount} BGT`,
  });

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
          write({
            address: "0xd9A998CaC66092748FfEc7cFBD155Aae1737C2fF",
            abi: STAKING_PRECOMPILE_ABI,
            functionName: "delegate",
            params: [validator, formatToBaseUnit(input_amount, 18)],
          });
          setInputAmount("");
        }}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Delegate"}
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
