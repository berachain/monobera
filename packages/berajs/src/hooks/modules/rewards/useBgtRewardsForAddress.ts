import { beraTokenAddress } from "@bera/config";
import { type Weight } from "@bera/graphql";
import { beraJsConfig } from "@bera/wagmi";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import POLLING from "~/config/constants/polling";
import { useTokenHoneyPrice } from "~/hooks/useTokenHoneyPrice";
import { usePollGlobalCuttingBoard } from "..";
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

  const { data: beraPrice } = useTokenHoneyPrice({
    config: beraJsConfig,
    args: { tokenAddress: beraTokenAddress },
  });
  // const beraPrice = useBeraPrice();
  const QUERY_KEY = [
    "bgtRewardsForAddress",
    address,
    cuttingBoard,
    beraPrice,
    inflationData,
  ];

  const swrResponse = useSWR(
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
          const weight = cb.amount / totalAmount;
          const amountPerYear = weight * inflationData.bgtPerYear;

          return {
            bgtPerYear: amountPerYear,
            UsdBgtPerYear: amountPerYear * Number(beraPrice),
          };
        }
        return undefined;
      }
      return undefined;
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
    ...swrResponse,
    useBgtRewardsForAddress,
    useBgtApr,
  };
};
