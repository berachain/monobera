import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BeravaloperToEth,
  STAKING_PRECOMPILE_ABI,
  getTokens,
  truncateHash,
  usePollAccountDelegations,
  usePollActiveValidators,
  usePollAssetWalletBalance,
  type Validator,
  useBeraConfig,
} from "@bera/berajs";
import { useTxn } from "@bera/shared-ui";
import { type Address, getAddress, parseUnits } from "viem";

export const useRedelegate = (fromAddress: `0x{string}`) => {
  const [redelegateAmount, setRedelegateAmount] = useState(0);
  const [dstValidator, setDstValidator] = useState<Validator | null>(null);
  const { useActiveValidator } = usePollActiveValidators();
  const srcValidator = useActiveValidator(fromAddress);
  usePollAssetWalletBalance();
  const tokens = getTokens();
  const { useSelectedAccountDelegation } =
    usePollAccountDelegations(fromAddress);
  const accountDelegation = useSelectedAccountDelegation();
  const router = useRouter();
  const { networkConfig } = useBeraConfig();

  const { write, isLoading } = useTxn({
    message: `redelegate ${redelegateAmount} BGT from ${truncateHash(
      fromAddress,
    )} to ${
      dstValidator &&
      truncateHash(
        getAddress(
          BeravaloperToEth(dstValidator.operatorAddress || "").toLowerCase(),
        ),
      )
    }`,
    onSuccess: () => {
      void router.push("/");
    },
    onError: (e) => console.log(e),
  });

  const redelegate = () => {
    if (dstValidator && srcValidator) {
      try {
        write({
          address: networkConfig.precompileAddresses.stakingAddress as Address,
          abi: STAKING_PRECOMPILE_ABI,
          functionName: "beginRedelegate",
          params: [
            getAddress(
              BeravaloperToEth(srcValidator.operatorAddress),
            ).toLowerCase(),
            getAddress(
              BeravaloperToEth(dstValidator.operatorAddress),
            ).toLowerCase(),
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
