import { useMemo } from "react";
import { CrocPoolView } from "@bera/beracrocswap";
import { type CrocContext } from "@bera/beracrocswap/dist/context";
import { CrocTokenView } from "@bera/beracrocswap/dist/tokens";
import { useCrocEnv, type PoolV2 } from "@bera/berajs";

export const useCrocPool = (
  pool: PoolV2 | undefined,
): CrocPoolView | undefined => {
  const crocenv = useCrocEnv();

  return useMemo(() => {
    if (!pool || !crocenv.crocEnv) {
      return undefined;
    }
    const baseToken = pool.baseInfo;
    const quoteToken = pool.quoteInfo;

    const crocContext: Promise<CrocContext> = crocenv.crocEnv.context;

    const baseAssetCrocTokenView: CrocTokenView = new CrocTokenView(
      crocContext,
      baseToken?.address as string,
      baseToken?.decimals as number,
    );
    const quoteAssetCrocTokenView: CrocTokenView = new CrocTokenView(
      crocContext,
      quoteToken?.address as string,
      quoteToken?.decimals as number,
    );

    const crocPoolView: CrocPoolView = new CrocPoolView(
      quoteAssetCrocTokenView,
      baseAssetCrocTokenView,
      crocContext,
    );

    return crocPoolView;
  }, [crocenv, pool]);
};
