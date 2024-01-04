import { useBeraJs, usePollPrices } from "@bera/berajs";
import {
  client,
  getGlobalCuttingBoard,
  getValidatorCuttingBoard,
  type Weight,
} from "@bera/graphql";
import useSWR from "swr";

export interface Coin {
  amount: string;
  denom: string;
}

export interface TvlData {
  data: any;
  UTCTime: string;
  coins: Coin[];
}

// export const getTvlPrices = (
//   tvlData: (TvlData | undefined)[],
//   prices: MappedTokens | undefined,
// ) => {
//   if (!prices) return new Array(tvlData.length).fill(0);
//   const resultArray: number[] = [];
//   tvlData?.forEach((tvl) => {
//     if (tvl === undefined) {
//       resultArray.push(0);
//       return;
//     } else {
//       const total = tvl.coins.reduce(
//         (
//           acc: number,
//           cur: { denom: string; amount: string | number | bigint | boolean },
//         ) => {
//           const price = prices[getAddress(cur.denom)] ?? 0;
//           const value = Number(formatUnits(BigInt(cur.amount), 18)) * price;
//           return acc + value;
//         },
//         0,
//       );
//       resultArray.push(total);
//     }
//   });
//   return resultArray;
// };

// export const getPoolTvl = async (address: string) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_ANALYTICS}/analytics/tvldaily?pool=${address}&num_of_days=1`,
//     );
//     const jsonRes = await res.json();
//     return jsonRes.result[jsonRes.result.length - 1] ?? undefined;
//   } catch (e) {
//     console.log(e);
//   }
// };

export interface GaugeWeight {
  label: string;
  address: string;
  amount: number;
  percentage: number;
}
export const useUserGaugeWeight = () => {
  const { account } = useBeraJs();
  const { usePrices } = usePollPrices();
  const { data: prices } = usePrices();
  const QUERY_KEY = ["user-gauge-weight", account, prices];
  return useSWR(
    QUERY_KEY,
    () => {
      try {
        // if (!prices) return undefined;
        // const response = await fetch(
        //   `${indexerUrl}/bgt/rewards/delegator/${account}`,
        // );
        // const result = await response.json().then((res) => res.result);
        // // const promiseArray = result.map((w: any) => getPoolTvl(w.address));
        // // const cbTvlData = await Promise.all(promiseArray);
        // // const tvl = getTvlPrices(cbTvlData, prices);

        // const gaugeWeightArray: GaugeWeight[] = result.map((w: any) => {
        //   return {
        //     label: w.address,
        //     address: w.address,
        //     amount: Number(w.amount),
        //     percentage: Number(w.percentage),
        //     // tvl: tvl[i],
        //   };
        // });
        return [];
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: 5 * 60 * 1000, // 5 mins
    },
  );
};

export const useValidatorGaugeWeight = (address: string) => {
  const QUERY_KEY = ["validator-gauge-weight", address];
  return useSWR(
    QUERY_KEY,
    async () => {
      try {
        const validatorCuttingBoard: Weight[] = await client
          .query({
            query: getValidatorCuttingBoard,
            variables: {
              page: 0,
              limit: 1,
              validatorAddress: address,
            },
          })
          .then((res: any) => {
            return res.data.cuttingBoards[0].weights;
          })
          .catch((e) => {
            console.log(e);
            return undefined;
          });

        const totalAmount = validatorCuttingBoard.reduce((arr, curr) => {
          return arr + Number(curr.amount);
        }, 0);

        const cbArray: GaugeWeight[] = validatorCuttingBoard.map((w: any) => {
          return {
            label: w.receiver,
            address: w.receiver,
            amount: Number(w.amount),
            percentage: Number(w.amount) / totalAmount,
          };
        });

        return cbArray;
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: 5 * 60 * 1000, // 5 mins
    },
  );
};

export const useGlobalValidatorGaugeWeight = () => {
  const QUERY_KEY = ["global-gauge-weight"];
  return useSWR(
    QUERY_KEY,
    async () => {
      try {
        const globalCuttingBoard: Weight[] = await client
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
          .catch((e) => {
            console.log(e);
            return undefined;
          });

        const totalAmount = globalCuttingBoard.reduce((arr, curr) => {
          return arr + Number(curr.amount);
        }, 0);

        const gaugeWeightArray: GaugeWeight[] = globalCuttingBoard.map(
          (w: Weight) => {
            return {
              label: w.receiver,
              address: w.receiver,
              amount: Number(w.amount),
              percentage: Number(w.amount) / totalAmount,
            };
          },
        );
        return gaugeWeightArray;
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: 5 * 60 * 1000, // 5 mins
    },
  );
};
