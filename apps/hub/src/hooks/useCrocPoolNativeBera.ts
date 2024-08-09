import { CrocPoolView } from "@bera/beracrocswap";
import { type CrocContext } from "@bera/beracrocswap/dist/context";
import { CrocTokenView } from "@bera/beracrocswap/dist/tokens";
import { useCrocEnv } from "@bera/berajs";
import { useMemo } from "react";

export const useCrocPoolNativeBera = (
  baseTokenAddress: any,
  baseTokenDecimals: any,
  quoteTokenAddress: any,
  quoteTokenDecimals: any,
): CrocPoolView | undefined => {
  const crocenv = useCrocEnv();

  return useMemo(() => {
    if (
      !baseTokenAddress ||
      !baseTokenDecimals ||
      !quoteTokenAddress ||
      !quoteTokenDecimals ||
      !crocenv.crocEnv
    ) {
      return undefined;
    }

    const crocContext: Promise<CrocContext> = crocenv.crocEnv.context;

    const baseAssetCrocTokenView: CrocTokenView = new CrocTokenView(
      crocContext,
      baseTokenAddress as string,
      baseTokenDecimals as number,
    );
    const quoteAssetCrocTokenView: CrocTokenView = new CrocTokenView(
      crocContext,
      quoteTokenAddress as string,
      quoteTokenDecimals as number,
    );

    const crocPoolView: CrocPoolView = new CrocPoolView(
      quoteAssetCrocTokenView,
      baseAssetCrocTokenView,
      crocContext,
    );

    return crocPoolView;
  }, [
    crocenv,
    baseTokenAddress,
    baseTokenDecimals,
    quoteTokenAddress,
    quoteTokenDecimals,
  ]);
};
