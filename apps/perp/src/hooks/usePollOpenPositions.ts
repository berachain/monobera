import { DefaultHookReturnType, useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import useSWR from "swr";
import { usePollPositionsLiqFeePrices } from "@bera/berajs";

import { API_FILTERS, DEFAULT_QUERY, POLLING } from "~/utils/constants";
import type { TableStateProps } from "~/types/table";
import { OpenTrade, Pagination } from "@bera/proto/src";
import { OpenPositionData } from "~/types/market";
import { IOpenTradeWithoutMarket } from "~/types/order-history";

export const usePollOpenPositions = (
  props: TableStateProps,
): Omit<
  DefaultHookReturnType<
    OpenPositionData & {
      total: number;
    }
  >,
  "mutate"
> & {
  total: number;
  pagination?: Pagination;
  multiRefresh: () => void;
} => {
  const { account } = useBeraJs();
  const queryString =
    Object.entries(props.positions ?? {})
      .filter(
        ([key, value]) => API_FILTERS.includes(key) && value !== undefined,
      )
      .map(([key, value]) => `${key}=${value}`)
      .join("&") ?? "";
  const QUERY_KEY =
    account && queryString ? ["openPositions", account, queryString] : null;

  const { data, isLoading, isValidating, error, mutate } = useSWR<{
    result: OpenTrade[];
    pagination: Pagination;
    total: number;
  }>(
    QUERY_KEY,
    async () => {
      if (!account || !queryString) {
        throw new Error("No account or query string");
      }
      const res = await fetch(
        `${perpsEndpoint}/opentrades/traders/${account}${
          queryString ? `?${queryString}` : ""
        }`,
      );
      const data = await res.json();
      // TODO: ask backend to provide a total items in the response
      const totalRes = await fetch(
        `${perpsEndpoint}/opentrades/traders/${account}?${DEFAULT_QUERY}`,
      );
      const total = await totalRes.json();
      return { ...data, total: total.pagination.total_items } ?? {};
    },
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      refreshInterval: POLLING.SLOW,
    },
  );

  const {
    data: openPositionsLiqFeesData,
    isLoading: isLoadingLiqFees,
    isValidating: isValidatingLiqFees,
  } = usePollPositionsLiqFeePrices(
    data?.result.map((position: OpenTrade) => Number(position.index)) ?? [],
  );

  const refresh = () => void mutate();

  return {
    data: {
      result:
        (data?.result.map((position, index) => {
          return {
            ...position,
            borrowing_fee:
              openPositionsLiqFeesData?.at(1)?.at(index)?.toString() ?? "0",
            liq_price:
              openPositionsLiqFeesData?.at(0)?.at(index)?.toString() ?? "0",
          };
        }) as IOpenTradeWithoutMarket[]) ?? [],
      pagination: data?.pagination ?? {
        page: 0,
        per_page: 0,
        total_pages: 0,
        total_items: 0,
      },
      total: data?.total ?? 0,
    },
    error,
    isLoading,
    isValidating,
    total: data?.total ?? 0,
    pagination: data?.pagination,
    refresh,
    multiRefresh: () => {
      refresh();
      setTimeout(refresh, 2500);
      setTimeout(refresh, 5000);
    },
  };
};
