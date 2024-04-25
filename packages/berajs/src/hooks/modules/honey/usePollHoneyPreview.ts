import useSWR from "swr";
import { usePublicClient } from "wagmi";

import { HoneyPreviewMethod, getHoneyPreview } from "~/actions";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType, Token } from "~/types";

export interface UsePollHoneyPreviewArgs {
  collateral: Token | undefined;
  amount: string;
  mint: boolean; // true mint, false redeem
  given_in: boolean; // true given in, false given out
}

export interface UsePollHoneyPreviewResponse
  extends DefaultHookReturnType<string | undefined> {}

export const usePollHoneyPreview = ({
  args: { collateral, amount, mint, given_in },
  options,
}: {
  args: UsePollHoneyPreviewArgs;
  options?: DefaultHookOptions;
}): UsePollHoneyPreviewResponse => {
  const publicClient = usePublicClient();
  const method = mint
    ? given_in
      ? HoneyPreviewMethod.Mint
      : HoneyPreviewMethod.RequiredCollateral
    : given_in
      ? HoneyPreviewMethod.Redeem
      : HoneyPreviewMethod.HoneyToRedeem;

  const QUERY_KEY = [method, collateral?.address, amount, mint, given_in];
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const swrResponse = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) throw new Error("publicClient is not defined");
      if (!config.contracts?.honeyRouterAddress)
        throw new Error("missing contract address honeyRouterAddress");
      if (!collateral) throw new Error("invalid collateral");
      if (Number(amount) <= 0) throw new Error("invalid amount");
      return await getHoneyPreview({
        client: publicClient,
        config,
        collateral,
        amount,
        method,
      });
    },
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.FAST,
    },
  );
  return {
    ...swrResponse,
    refresh: () => void swrResponse.mutate(),
  };
};
