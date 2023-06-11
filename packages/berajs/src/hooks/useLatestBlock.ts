import { useBlockNumber } from "wagmi";

export const useLatestBlock = () => {
  const { data } = useBlockNumber({
    watch: true,
  });
  return data ?? 0n;
};
