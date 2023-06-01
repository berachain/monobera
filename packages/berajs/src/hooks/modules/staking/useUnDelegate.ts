import abi from "~/config/abi/modules/staking/IStakingModule.abi";
import { useBeraContractWrite } from "~/hooks/useContractWrite";
import { STAKING_PRECOMPILE_ADDRESS } from "./constants";

export const useUnDelegate = (
  validatorAddress: `0x${string}`,
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
    undelegate: () =>
      write({
        address: STAKING_PRECOMPILE_ADDRESS,
        abi: abi,
        functionName: "undelegate",
        params: [validatorAddress, amount],
      }),
  };
};
