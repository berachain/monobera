"use client";

import { useMemo, useState } from "react";
import {
  truncateHash,
  useActiveValidators,
  useGetAccountDelegation,
  useGetRawValidators,
  useSelectedAccountDelegation,
} from "@bera/berajs";
import abi from "@bera/berajs/src/config/abi/modules/staking/IStakingModule.abi";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Input } from "@bera/ui/input";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

// Default Address of the Staking Precompile Contract on Polaris.
// More information here: TODO: Add link to docs
const STAKING_PRECOMPILE_ADDRESS = "0xd9A998CaC66092748FfEc7cFBD155Aae1737C2fF";

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

  useGetRawValidators();

  const validators = useActiveValidators();

  const validator = useMemo(() => {
    if (validators) {
      return validators[0];
    }
  }, [validators]);

  useGetAccountDelegation(validator);

  const delegatedAmount = useSelectedAccountDelegation(validator);

  // Prepares a payload for writing a delegate transaction to the Staking Precompile contract.
  // passed in arguments:
  // validator_address: Address of the validator to delegate to
  // formatToBaseUnit(input_amount, 18) a formatted value of the amount to delegate to the selected validator
  // this payload will be used later to call the Staking Precompile contract's delegate function when the button is clicked.
  const { config } = usePrepareContractWrite({
    address: STAKING_PRECOMPILE_ADDRESS,
    abi: abi,
    functionName: "delegate",
    args: [validator, formatToBaseUnit(input_amount, 18)],
  });

  // When the button is clicked, it will call the Staking Precompile contract's delegate function.
  // on Error, will log the error to the console.
  const { write } = useContractWrite({
    ...config,
    onError(error) {
      console.log("Error", error);
    },
  });

  return (
    <Card className="p-4 xl:w-[1000px]">
      <p>Validator Address:</p>
      <p>{validator ? truncateHash(validator) : ""}</p>
      <p>Delegated Amount</p>
      <p>{delegatedAmount ? delegatedAmount : "not delegating"} tBera</p>

      <Input
        type="number"
        onChange={(e) => setInputAmount(e.target.value)}
        value={input_amount}
      />
      <Button onClick={write}>Stake</Button>
    </Card>
  );
}
