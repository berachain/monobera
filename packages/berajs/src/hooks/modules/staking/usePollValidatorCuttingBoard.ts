import { client, getValidatorCuttingBoard, type Weight } from "@bera/graphql";
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
      try {
        if (!validatorAddress) return undefined;
        const validatorCuttingBoard: Weight[] = await client
          .query({
            query: getValidatorCuttingBoard,
            variables: {
              page: 0,
              limit: 1,
              validatorAddress: validatorAddress,
            },
          })
          .then((res: any) => {
            return res.data.cuttingBoards[0].weights;
          })
          .catch((e) => {
            console.log(e);
            return undefined;
          });
        const sortedValidatorCuttingBoard = [...validatorCuttingBoard].sort(
          (a: Weight, b: Weight) => Number(b.weight) - Number(a.weight),
        );

        return sortedValidatorCuttingBoard;
      } catch (e) {
        console.log(e);
      }
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
