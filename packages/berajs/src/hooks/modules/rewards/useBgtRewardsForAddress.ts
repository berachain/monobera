import { type Weight } from "@bera/graphql";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import POLLING from "~/config/constants/polling";
import { useBeraPrice, usePollGlobalCuttingBoard } from "..";
import { usePollBgtInflation } from "../staking/usePollBgtInflation";

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

  const { useInflationData } = usePollBgtInflation();

  const cuttingBoard = useGlobalCuttingBoard();
  const inflationData = useInflationData();

  const beraPrice = useBeraPrice();
  const QUERY_KEY = [
    "bgtRewardsForAddress",
    address,
    cuttingBoard,
    beraPrice,
    inflationData,
  ];
  const { isLoading } = useSWR(
    QUERY_KEY,
    () => {
      if (cuttingBoard && address && inflationData) {
        const totalAmount = cuttingBoard.reduce((acc: number, curr: any) => {
          return acc + Number(curr.amount);
        }, 0);
        const cb: Weight = cuttingBoard.find(
          (b: Weight) => b.receiver.toLowerCase() === address.toLowerCase(),
        );
        if (cb) {
          console.log({ cb, totalAmount, inflationData });
          const weight = cb.amount / totalAmount;
          const amountPerYear = weight * inflationData.bgtPerYear;

          return {
            bgtPerYear: amountPerYear,
            UsdBgtPerYear: amountPerYear * Number(beraPrice),
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
