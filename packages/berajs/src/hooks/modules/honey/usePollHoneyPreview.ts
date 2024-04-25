import useSWR from "swr";
import { usePublicClient } from "wagmi";

import { HoneyPreviewMethod, getHoneyPreview } from "~/actions";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType, Token } from "~/types";

export const usePollHoneyPreview = (
  collateral: Token | undefined,
  amount: string,
  mint: boolean, // true mint, false redeem
  given_in: boolean, // true given in, false given out
  options?: DefaultHookOptions,
): DefaultHookReturnType<string | undefined> => {
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
  return useSWR(QUERY_KEY, async () => {
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
  });
};
