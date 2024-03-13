import { dexClient, getGlobalCuttingBoard, type Weight } from "@bera/graphql";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import POLLING from "~/config/constants/polling";

export const usePollGlobalCuttingBoard = () => {
  const method = "globalCuttingBoard";
  const QUERY_KEY = [method];
  useSWR(
    QUERY_KEY,
    async () => {
      const globalCuttingBoard: Weight[] = await dexClient
        .query({
          query: getGlobalCuttingBoard,
          variables: {
            page: 0,
            limit: 1,
          },
        })
        .then((res: any) => {
          return res.data.globalCuttingBoardDatas[0].weights;
        })
        .catch((e: any) => {
          console.log(e);
          return undefined;
        });
      return globalCuttingBoard;
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useGlobalCuttingBoard = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    useGlobalCuttingBoard,
  };
};
