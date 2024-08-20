import { useEffect, useState } from "react";
import { multicallAddress } from "@bera/config";
import { useQuery } from "@tanstack/react-query";
import { erc20Abi, isAddress } from "viem";
import { usePublicClient } from "wagmi";

import { useBeraJs } from "~/contexts";
import type { PoolV2 } from "~/types";
import { mapPoolsToPoolsV2 } from "~/utils";
import {
  dexClient,
  getFilteredPoolsBySymbol,
  getFilteredPoolsByAddress,
} from "@bera/graphql";
import { useTotalPoolCount } from "./useTotalPoolCount";
interface Call {
  abi: typeof erc20Abi;
  address: `0x${string}`;
  functionName: string;
  args: any[];
}
export const usePoolTable = (sorting: any, page: number, pageSize: number) => {
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const { account } = useBeraJs();
  const publicClient = usePublicClient();

  const sortOption =
    sorting[0] !== undefined && sorting[0].id !== undefined
      ? sorting[0].id
      : "tvlUsd";
  const sortOrder =
    sorting[0] !== undefined && sorting[0].desc !== undefined
      ? sorting[0].desc === true
        ? "desc"
        : "asc"
      : "desc";

  const { data, isFetching } = useQuery<any, any, any[]>({
    queryKey: [
      "projects",
      sortOption,
      sortOrder,
      keyword,
      publicClient,
      page,
      pageSize,
    ],
    queryFn: async ({ queryKey }: any) => {
      try {
        const keyword = queryKey[3];

        if (isAddress(keyword)) {
          const res = await dexClient.query({
            query: getFilteredPoolsByAddress,
            variables: {
              keyword: queryKey[3].toLowerCase(),
              skip: (queryKey[5] - 1) * queryKey[6],
              first: queryKey[6],
              order: queryKey[1],
              orderDirection: queryKey[2],
            },
          });
          const data = mapPoolsToPoolsV2(res.data.pools);
          return data;
        }
        const res = await dexClient.query({
          query: getFilteredPoolsBySymbol,
          variables: {
            keyword: queryKey[3].toLowerCase(),
            skip: (queryKey[5] - 1) * queryKey[6],
            first: queryKey[6],
            order: queryKey[1],
            orderDirection: queryKey[2],
          },
        });

        const data = mapPoolsToPoolsV2(res.data.pools);
        return data;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  const [processedData, setProcessedData] = useState<PoolV2[]>([]);

  console.log(data);

  useEffect(() => {
    if (account && publicClient && data) {
      const validData = data.filter((item: PoolV2) => item.base && item.quote);
      const call: Call[] = validData.map((item: PoolV2) => ({
        address: item.shareAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account],
      }));

      publicClient
        .multicall({
          contracts: call,
          multicallAddress: multicallAddress,
        })
        .then((result) => {
          const newProcessedData = validData.map(
            (item: PoolV2, index: number) => {
              return {
                ...item,
                isDeposited:
                  result[index].result &&
                  result[index].status === "success" &&
                  result[index].result !== 0n,
              };
            },
          ) as PoolV2[];
          setProcessedData(newProcessedData);
        });
    } else {
      setProcessedData(data ?? []);
    }
  }, [data, account]);

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      setKeyword(search);
    }
  };

  const { data: poolCount } = useTotalPoolCount();

  const isReachingEnd = poolCount
    ? processedData.length >= parseFloat(poolCount)
    : true;

  return {
    data: processedData,
    poolCount,
    search,
    setSearch,
    isLoadingMore: isFetching,
    handleEnter,
    keyword,
    setKeyword,
    isReachingEnd,
  };
};
