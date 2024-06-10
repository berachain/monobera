import { useChains } from "wagmi";

export function useChainId(): number | null {
  const chains = useChains();

  return chains[0]?.id ?? null;
}
