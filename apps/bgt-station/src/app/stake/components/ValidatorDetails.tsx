"use client";

import { useMemo, useState } from "react";
import {
  truncateHash,
  useActiveValidators,
  useDelegate,
  useGetAccountDelegation,
  useGetRawValidators,
  useSelectedAccountDelegation,
} from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Input } from "@bera/ui/input";

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
  const [input_amount, setInputAmount] = useState<string>("0");

  useGetRawValidators();

  const validators = useActiveValidators();

  const validator = useMemo(() => {
    if (validators) {
      return validators[0];
    }
  }, [validators]);

  useGetAccountDelegation(validator);

  const delegatedAmount = useSelectedAccountDelegation(validator);

  const { delegate, isError, isLoading } = useDelegate(
    validator,
    formatToBaseUnit(input_amount, 18),
  );

  return (
    <Card className="w-full p-4 xl:w-[1000px]">
      <p>Validator Address:</p>
      <p>{validator ? truncateHash(validator) : ""}</p>
      <p>Delegated Amount</p>
      <p>{delegatedAmount ? delegatedAmount : "not delegating"} tBera</p>

      <Input
        type="number"
        onChange={(e) => setInputAmount(e.target.value)}
        value={input_amount}
      />
      <Button onClick={delegate}>Stake</Button>
    </Card>
  );
}
