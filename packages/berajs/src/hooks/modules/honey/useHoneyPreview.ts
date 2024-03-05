import { honeyRouterAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, parseUnits } from "viem";
import { usePublicClient } from "wagmi";
import { type Token } from "~/api";
import { HONEY_ROUTER_ABI } from "~/config";

export const usePollHoneyPreview = (
  collateral: Token | undefined,
  amount: string,
  mint: boolean, // true mint, false redeem
  given_in: boolean, // true given in, false given out
) => {
  const publicClient = usePublicClient();
  const method = mint
    ? given_in
      ? "previewMint"
      : "previewRequiredCollateral"
    : given_in
      ? "previewRedeem"
      : "previewHoneyToRedeem";
  const QUERY_KEY = [method, collateral?.address, amount, mint, given_in];
  const swrResponse = useSWR(QUERY_KEY, async () => {
    try {
      if (!collateral || Number(amount) <= 0) return undefined;

      let formattedAmount = 0n;
      if ((mint && given_in) || (!mint && !given_in)) {
        formattedAmount = parseUnits(amount, collateral.decimals);
      } else {
        formattedAmount = parseUnits(amount, 18); //honey decimals
      }

      const result = (await publicClient.readContract({
        address: honeyRouterAddress,
        abi: HONEY_ROUTER_ABI,
        functionName: method,
        args: [collateral.address, formattedAmount],
      })) as bigint;

      let formattedResult = "0";
      if ((mint && given_in) || (!mint && !given_in)) {
        formattedResult = formatUnits(result, 18); //honey decimals
      } else {
        formattedResult = formatUnits(result, collateral.decimals);
      }
      return formattedResult;
    } catch (e) {
      console.log("error", e);
      return undefined;
    }
  });

  const useHoneyPreview = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    ...swrResponse,
    useHoneyPreview,
  };
};
