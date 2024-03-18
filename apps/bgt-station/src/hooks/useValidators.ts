import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { mutate } from "swr";
import { ValidatorV2 } from "@bera/proto/src";

export const usePollGlobalValidators = ({
  page,
  limit,
  sort,
  order,
  search,
}: {
  page: number;
  limit: number;
  sort: string;
  order: string;
  search: string;
}) => {
  const QUERY_KEY = ["globalValidators", page, limit, sort, order, search];
  useSWR(QUERY_KEY, async () => {
    return [];
  });

  const useGlobalValidators = () => {
    const { data = undefined } = useSWRImmutable<ValidatorV2[]>(QUERY_KEY);
    return data;
  };

  return {
    useGlobalValidators,
    refresh: () => mutate(QUERY_KEY),
  };
};
