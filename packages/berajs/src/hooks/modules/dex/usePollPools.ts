import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";
import { fetchToken } from "wagmi/actions";

import { type Token } from "~/api";
import { getContracts } from "~/api/contracts";
import { DEX_PRECOMPILE_ABI, DEX_PRECOMPILE_ADDRESS } from "~/config";

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export interface Pool {
  name: string;
  address: string;
  swapFee: bigint;
  weights: WeightedToken[];
  shareAddress: string;
  totalShares: bigint;
  totalValue: number;
}

interface Weight {
  asset: string;
  weight: bigint;
  totalDeposited: number;
}

export interface WeightedToken extends Token {
  weight: number;
  formattedAmountDeposited: string;
  price: number;
  totalPrice: number;
}
// TODO: this is so cursed, wen indexing

// TODO: introduce a way to add tokens into our localstorage system such that they can be used globally
export const usePollPools = () => {
  const publicClient = usePublicClient();

  const method = "getAllPoolAddresses";
  const QUERY_KEY = [method];
  useSWRImmutable(QUERY_KEY, async () => {
    try {
      const pools = await publicClient.readContract({
        address: DEX_PRECOMPILE_ADDRESS,
        abi: DEX_PRECOMPILE_ABI,
        functionName: method,
        args: [],
      });

      const poolData = (await Promise.all(
        (pools as string[])?.map(async (pool: string) => {
          const call: Call[] = [
            {
              abi: DEX_PRECOMPILE_ABI,
              address: DEX_PRECOMPILE_ADDRESS,
              functionName: "getPoolName",
              args: [pool],
            },
            {
              abi: DEX_PRECOMPILE_ABI,
              address: DEX_PRECOMPILE_ADDRESS,
              functionName: "getPoolOptions",
              args: [pool],
            },
            {
              abi: DEX_PRECOMPILE_ABI,
              address: DEX_PRECOMPILE_ADDRESS,
              functionName: "getLiquidity",
              args: [pool],
            },
            {
              abi: DEX_PRECOMPILE_ABI,
              address: DEX_PRECOMPILE_ADDRESS,
              functionName: "getTotalShares",
              args: [pool],
            },
          ];

          const contracts = getContracts();
          const result = await publicClient.multicall({
            contracts: call,
            multicallAddress: contracts.multicall as `0x${string}`,
          });

          const totalWeight: number = (
            (result[1]?.result as any)?.weights as Weight[]
          ).reduce((total, weight) => {
            return total + Number(formatUnits(weight.weight, 0));
          }, 0);

          const tokenInformationList: WeightedToken[] = (await Promise.all(
            ((result[1]?.result as any)?.weights as Weight[])?.map(
              async (weight: Weight, i) => {
                const tokenInformation = await fetchToken({
                  address: weight.asset as `0x${string}`,
                });
                const amountDeposited = (result[2]?.result as any[])[1][i];
                return {
                  ...tokenInformation,
                  weight: Number(formatUnits(weight.weight, 0)) / totalWeight,
                  formattedAmountDeposited: formatUnits(
                    amountDeposited,
                    tokenInformation.decimals,
                  ),
                  price: 1,
                  totalPrice:
                    Number(
                      formatUnits(amountDeposited, tokenInformation.decimals),
                    ) * 1,
                };
              },
            ),
          )) as unknown as WeightedToken[];

          const totalValue: number = tokenInformationList.reduce(
            (total, token) => {
              return total + token.totalPrice;
            },
            0,
          );

          const poolDetails: Pool = {
            address: pool,
            name: (result[0]?.result as unknown as string) ?? "",
            swapFee: (result[1]?.result as any)?.swapFee,
            weights: tokenInformationList,
            shareAddress: (result[3]?.result as any[])[0][0],
            totalShares: (result[3]?.result as any[])[1][0],
            totalValue,
          };
          await mutate([pool, ...QUERY_KEY], poolDetails);
          return poolDetails;
        }),
      )) as unknown as Pool[];

      return poolData;
    } catch (error) {
      console.log(error);
    }
  });

  const usePools = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useSelectedPool = (poolAddress: string): Pool => {
    const { data = undefined } = useSWRImmutable([poolAddress, ...QUERY_KEY]);
    return data;
  };
  return {
    usePools,
    useSelectedPool,
  };
};
