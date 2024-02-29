import { CrocPoolView, CrocPositionView } from "@bera/beracrocswap";
import { type CrocContext } from "@bera/beracrocswap/dist/context";
import { CrocTokenView } from "@bera/beracrocswap/dist/tokens";
import { useBeraJs, useCrocEnv } from "@bera/berajs";
import { useMemo } from "react";
import { type PoolV2 } from "~/app/pools/fetchPools";

export const useCrocPosition = (
  pool: PoolV2 | undefined,
): CrocPositionView | undefined => {
  const crocenv = useCrocEnv();
  const { account } = useBeraJs();
  return useMemo(() => {
    if (!pool || !crocenv.crocEnv || !account) {
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

    const position = new CrocPositionView(crocPoolView, account);
    return position;
  }, [crocenv, pool, account]);
};
