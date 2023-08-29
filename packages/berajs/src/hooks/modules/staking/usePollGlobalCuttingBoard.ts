import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import POLLING from "~/config/constants/polling";

export const usePollGlobalCuttingBoard = () => {
  const method = "globalCuttingBoard";
  const QUERY_KEY = [method];
  useSWR(
    QUERY_KEY,
    async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_INDEXER_ENDPOINT}/bgt/rewards`,
      );
      const temp = await response.json();
      return temp;
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
