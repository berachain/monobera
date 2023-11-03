import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import POLLING from "~/config/constants/polling";
import { useBeraPrice, usePollGlobalCuttingBoard } from "..";

interface IBgtRewardsForAddress {
  bgtPerYear: number;
  UsdBgtPerYear: number;
}
export const usePollBgtRewardsForAddress = ({
  address,
}: {
  address: string | undefined;
}) => {
  const { useGlobalCuttingBoard } = usePollGlobalCuttingBoard();

  const cuttingBoard = useGlobalCuttingBoard();

  const beraPrice = useBeraPrice();
  const QUERY_KEY = ["bgtRewardsForAddress", address, cuttingBoard, beraPrice];
  const { isLoading } = useSWR(
    QUERY_KEY,
    () => {
      if (cuttingBoard && address) {
        const cb = cuttingBoard?.find(
          (b: any) => b.address.toLowerCase() === address.toLowerCase(),
        );

        if (cb) {
          return {
            bgtPerYear: Number(cuttingBoard.amount),
            UsdBgtPerYear: Number(cuttingBoard.amount) * Number(beraPrice),
          };
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useBgtRewardsForAddress = (): IBgtRewardsForAddress | undefined => {
    const { data = undefined } = useSWRImmutable<
      IBgtRewardsForAddress | undefined
    >(QUERY_KEY);
    return data;
  };

  const useBgtApr = (tvl: number | undefined): number | undefined => {
    const { data = undefined } = useSWRImmutable<
      IBgtRewardsForAddress | undefined
    >(QUERY_KEY);
    if (data && tvl) {
      const apr = (data.UsdBgtPerYear / tvl) * 100;
      return apr;
    }
    return undefined;
  };
  return {
    isLoading,
    useBgtRewardsForAddress,
    useBgtApr,
  };
};
