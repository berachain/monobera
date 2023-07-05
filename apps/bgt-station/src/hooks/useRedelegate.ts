import { useState } from "react";
import {
  BeravaloperToEth,
  STAKING_PRECOMPILE_ABI,
  STAKING_PRECOMPILE_ADDRESS,
  getTokens,
  usePollAccountDelegations,
  usePollActiveValidators,
  usePollAssetWalletBalance,
  type Validator,
} from "@bera/berajs";
import { useTxn } from "@bera/shared-ui";
import { parseUnits } from "viem";

export const useRedelegate = (fromAddress: `0x{string}`) => {
  console.log("useRedelegate");
  const [redelegateAmount, setRedelegateAmount] = useState(0);
  const [dstValidator, setDstValidator] = useState<Validator | null>(null);
  const { useActiveValidator } = usePollActiveValidators();
  const srcValidator = useActiveValidator(fromAddress);
  usePollAssetWalletBalance();
  const tokens = getTokens();
  const { useSelectedAccountDelegation } =
    usePollAccountDelegations(fromAddress);
  const accountDelegation = useSelectedAccountDelegation();
  const { write, isLoading } = useTxn({
    message: `redelegate ${redelegateAmount} BGT from ${fromAddress} to ${dstValidator?.operatorAddress}`,
    onSuccess: () => console.log("success"),
    onError: () => console.log("error"),
  });

  const redelegate = () => {
    if (dstValidator && srcValidator) {
      console.log(
        "useRedelegate",
        BeravaloperToEth(srcValidator.operatorAddress).toLowerCase(),
        BeravaloperToEth(dstValidator.operatorAddress).toLowerCase(),
        parseUnits(`${redelegateAmount}`, 18),
      );
      try {
        write({
          address: STAKING_PRECOMPILE_ADDRESS,
          abi: STAKING_PRECOMPILE_ABI,
          functionName: "beginRedelegate",
          params: [
            BeravaloperToEth(srcValidator.operatorAddress).toLowerCase(),
            BeravaloperToEth(dstValidator.operatorAddress).toLowerCase(),
            parseUnits(`${redelegateAmount}`, 18),
          ],
        });
      } catch (error) {
        throw new Error("Redelegate error", error as Error);
      }
    }
  };

  return {
    redelegateAmount,
    setRedelegateAmount,
    dstValidator,
    setDstValidator,
    srcValidator,
    isLoading,
    accountDelegation,
    redelegate,
    tokens,
  };
};
