import { erc20ABI } from "wagmi";

import { useBeraContractWrite } from "~/hooks/useContractWrite";

interface IUseTokenApprove {
  token: `0x${string}`;
  spender: `0x${string}`;
  amount?: bigint;
}
const useTokenApprove = ({
  token,
  spender,
  amount = 1000000n,
}: IUseTokenApprove) => {
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
    approve: () =>
      write({
        address: token,
        abi: erc20ABI as unknown as any[],
        functionName: "approve",
        params: [spender, amount],
      }),
  };
};

export default useTokenApprove;
