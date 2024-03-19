import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  STAKING_PRECOMPILE_ABI,
  TransactionActionType,
  truncateHash,
  usePollAccountDelegations,
  usePollActiveValidators,
  usePollAssetWalletBalance,
  useTokens,
  type Validator,
} from "@bera/berajs";
import { stakingAddress } from "@bera/config";
import { useTxn } from "@bera/shared-ui";
import { getAddress, parseUnits } from "viem";

export const useRedelegate = (fromAddress: `0x{string}`) => {
  const [redelegateAmount, setRedelegateAmount] = useState(0);
  const [dstValidator, setDstValidator] = useState<Validator | null>(null);
  const { useActiveValidator } = usePollActiveValidators();
  const srcValidator = useActiveValidator(fromAddress);
  usePollAssetWalletBalance();
  const { tokenList: tokens } = useTokens();
  const { useSelectedAccountDelegation } =
    usePollAccountDelegations(fromAddress);
  const accountDelegation = useSelectedAccountDelegation();
  const router = useRouter();

  const { write, isLoading } = useTxn({
    message: `redelegate ${redelegateAmount} BGT from ${truncateHash(
      fromAddress,
    )} to ${
      dstValidator && truncateHash(getAddress(dstValidator.operatorAddr))
    }`,
    onSuccess: () => {
      void router.push("/");
    },
    onError: (e) => console.log(e),
    actionType: TransactionActionType.REDELEGATE,
  });

  const redelegate = () => {
    if (dstValidator && srcValidator) {
      try {
        write({
          address: stakingAddress,
          abi: STAKING_PRECOMPILE_ABI,
          functionName: "beginRedelegate",
          params: [
            getAddress(srcValidator.operatorAddr).toLowerCase(),
            getAddress(dstValidator.operatorAddr).toLowerCase(),
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
