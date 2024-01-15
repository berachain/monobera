import { client, getTokenHoneyPrice, type Weight } from "@bera/graphql";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import POLLING from "~/config/constants/polling";
import { usePollGlobalCuttingBoard } from "..";
import { usePollBgtInflation } from "../staking/usePollBgtInflation";
import { beraTokenAddress, honeyTokenAddress } from "@bera/config";
import { type Address, getAddress } from "viem";

const handleNativeBera = (token: Address) => {
  if (token === getAddress(process.env.NEXT_PUBLIC_BERA_ADDRESS as string)) {
    return getAddress(process.env.NEXT_PUBLIC_WBERA_ADDRESS as string);
  }
  return token;
};

export const useTokenHoneyPrice = (tokenAddress: string | undefined) => {
  const { data } = useSWR(
    ["tokenHoneyPrice", tokenAddress],
    async () => {
      if (!tokenAddress) {
        return "0";
      }
      if (tokenAddress.toLowerCase() === honeyTokenAddress.toLowerCase()) {
        return "1";
      }
      return await client
        .query({
          query: getTokenHoneyPrice,
          variables: {
            id: handleNativeBera(tokenAddress as Address).toLowerCase(),
          },
        })
        .then((res: any) => {
          return res.data.tokenHoneyPrices[0].price;
        })
        .catch((e: any) => {
          console.log(e);
          return undefined;
        });
    },
    {
      refreshInterval: 10000,
    },
  );
  return data;
};


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

  const beraPrice = useTokenHoneyPrice(beraTokenAddress)
  // const beraPrice = useBeraPrice();
  const QUERY_KEY = [
    "bgtRewardsForAddress",
    address,
    cuttingBoard,
    beraPrice,
    inflationData,
  ];

  console.log(QUERY_KEY)
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
