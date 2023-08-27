import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address } from "wagmi";

import POLLING from "~/config/constants/polling";

export const usePollValidatorCuttingBoard = (
  validatorAddress: Address | undefined,
) => {
  const method = "getValidatorCuttingBoard";
  const QUERY_KEY = [validatorAddress, method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!validatorAddress) return undefined;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_INDEXER_ENDPOINT}/cuttingboards/active?validators=${validatorAddress}`,
      );
      const temp = await response.json();
      const cuttingBoard = temp;
      console.log(cuttingBoard);
      return cuttingBoard.result[0].weights.sort(
        (a: { percentage: string }, b: { percentage: string }) =>
          parseFloat(b.percentage) - parseFloat(a.percentage),
      );
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useValidatorCuttingBoard = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    useValidatorCuttingBoard,
  };
};
