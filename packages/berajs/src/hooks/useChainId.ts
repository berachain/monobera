import { useBeraConfig } from "~/contexts";

export function useChainId(): number | null {
  const { networkConfig } = useBeraConfig();
  return networkConfig?.chain.id ?? null;
}
