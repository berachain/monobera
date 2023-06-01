import abi from "~/config/abi/modules/staking/IStakingModule.abi";
import { useBeraContractWrite } from "~/hooks/useContractWrite";
import { STAKING_PRECOMPILE_ADDRESS } from "./constants";

export const useBeginRedelegate = (
  srcValidatorAddress: `0x${string}`,
  dstValidatorAddress: `0x${string}`,
  amount: bigint,
) => {
  const { write, isError, isLoading, isSuccess } = useBeraContractWrite({
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  return {
    isError,
    isLoading,
    isSuccess,
    beginRedelegate: () =>
      write({
        address: STAKING_PRECOMPILE_ADDRESS,
        abi: abi,
        functionName: "beginRedelegate",
        params: [srcValidatorAddress, dstValidatorAddress, amount],
      }),
  };
};
