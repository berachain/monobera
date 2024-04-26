import useSWR from "swr";

import { getProjects } from "../api/getProjects";

const CSV_URL = `https://docs.google.com/spreadsheets/d/e/${process.env.NEXT_PUBLIC_ECOSYSTEM_GOOGLE_SHEET_ID}/pub?output=csv`;

export function useProjects() {
  const { data, error, mutate } = useSWR(
    CSV_URL,
    async () => {
      return getProjects();
    },
    {
      revalidateOnFocus: false,
    },
  );

  return {
    projects: data,
    isLoading: !error && !data,
    isError: error,
    refresh: mutate,
  };
}
