import { perpsEndpoints, perpsCompetitionId } from "@bera/config";
import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

export const useLeaderboard = ({
  sort,
  page,
  wallet = "",
}: {
  sort: string;
  page: number;
  wallet: string;
}) => {
  const QUERY_KEY = ["leaderboard", sort, wallet, page];
  const { mutate } = useSWRConfig();
  const { isLoading, isValidating } = useSWRImmutable(QUERY_KEY, async () => {
    const res = await fetch(
      `${perpsEndpoints}/trading-comp-rankings${
        wallet ? `/${wallet}` : ""
      }?sort_by=${sort}&comp_id=${perpsCompetitionId}&page=${
        page ?? 1
      }&per_page=10`,
    );
    const data = await res.json();
    return data;
  });

  const useLeaderBoardData = () => {
    const { data } = useSWRImmutable(QUERY_KEY, { keepPreviousData: true });
    const { result } = data || {};
    return result;
  };

  const useLeaderBoardPagination = () => {
    const { data } = useSWRImmutable(QUERY_KEY, { keepPreviousData: true });
    const { pagination } = data || {};
    return pagination;
  };

  const useLeaderBoardDetails = () => {
    const { data } = useSWRImmutable(QUERY_KEY, { keepPreviousData: true });
    const { details } = data || {};
    return details;
  };

  return {
    isLoading,
    isValidating,
    refetch: () => void mutate(QUERY_KEY),
    useLeaderBoardData,
    useLeaderBoardDetails,
    useLeaderBoardPagination,
  };
};
