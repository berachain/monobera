import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { getAddress } from "viem";

import { type MappedTokens } from "../app/api/getPrice";
import { getAbsoluteUrl } from "../utils/vercel-utils";

export const usePollPrices = () => {
  const QUERY_KEY = ["prices"];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      const res = await fetch(`${getAbsoluteUrl()}/api`);
      const data: MappedTokens = await res.json();
      return data;
    },
    {
      refreshInterval: 2 * 60 * 1000, // 2 mins
    },
  );

  const usePrices = () => {
    const { data = undefined } = useSWRImmutable<MappedTokens>(QUERY_KEY);
    return data;
  };

  const usePrice = (tokenAddress: string): number => {
    const { data = undefined } = useSWRImmutable<MappedTokens>(QUERY_KEY);
    if (!data) return 0;
    return data[getAddress(tokenAddress)] ?? 0;
  };

  // const useValidatorBribesTotalValue = (
  //   validatorAddress: string,
  // ): number | undefined => {
  //   // const prices = usePrices();
  //   const { useValidatorBribes } = usePollValidatorBribes(
  //     validatorAddress as Address,
  //   );
  //   const bribes = useValidatorBribes();
  //   return undefined;
  // };

  // const useValidatorTVL = (validatorAddress: string): number | undefined => {
  //   const { useActiveValidator } = usePollActiveValidators();
  //   const activeValidator = useActiveValidator(validatorAddress);
  //   const BGTPrice = usePrice(process.env.NEXT_PUBLIC_WBERA_ADDRESS as string);
  //   const totalBGT = Number(
  //     formatUnits(BigInt(activeValidator?.tokens ?? "0"), 18),
  //   );
  //   return BGTPrice * totalBGT;
  // };
  // const useValidatorApr = (validatorAddress: string) => {
  //   const { useActiveValidator, useEstimatedBlocksPerYear } =
  //     usePollActiveValidators();
  //   const { useValidatorBribes } = usePollValidatorBribes(
  //     validatorAddress as Address,
  //   );
  //   const prices = usePrices();
  //   const validatorTVL = useValidatorTVL(validatorAddress);
  //   const bribesTotalValue = useValidatorBribesTotalValue(validatorAddress);
  //   const blocksPerYear = useEstimatedBlocksPerYear(validatorAddress);
  //   const { data } = useSWR(["getValidatorAPR", validatorAddress], async () => {
  //     if (!bribesTotalValue || !blocksPerYear) return undefined;
  //     return undefined;
  //   });
  // };
  return {
    usePrices,
    usePrice,
    isLoading,
  };
};
