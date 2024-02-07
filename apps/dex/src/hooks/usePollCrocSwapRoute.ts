import { POLLING } from "@bera/shared-ui/src/utils";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useCrocEnv, type Token } from "@bera/berajs";
import { useCrocToken } from "./useCrocPoolFromTokens";
import { useSlippage } from "@bera/shared-ui";
import { CrocSwapPlan } from "@bera/beracrocswap";

interface CrocSwapParams {
  sellToken: Token | undefined;
  buyToken: Token | undefined;
  qty: string;
}
export const usePollCrocSwapRoute = ({
  sellToken,
  buyToken,
  qty,
}: CrocSwapParams) => {
  const sellCrocToken = useCrocToken(sellToken);
  const buyCrocToken = useCrocToken(buyToken);
  const crocenv = useCrocEnv();
  const slippage = useSlippage();
  const QUERY_KEY = [
    sellCrocToken,
    buyCrocToken,
    crocenv.crocEnv?.context,
    slippage,
    qty,
  ];
  useSWR(
    QUERY_KEY,
    async () => {
      if (
        !sellCrocToken ||
        !buyCrocToken ||
        !crocenv.crocEnv ||
        !qty ||
        !slippage
      ) {
        return undefined;
      }
      try {
        console.log({
          sellCrocToken,
          buyCrocToken,
          qty,
          slippage,
          crocenv,
        });
        const crocSwapPlan = new CrocSwapPlan(
          sellCrocToken,
          buyCrocToken,
          qty,
          false,
          slippage,
          crocenv.crocEnv.context,
        );
        console.log(crocSwapPlan);
        const swapRoute = await crocSwapPlan.swap();
        console.log(swapRoute);
        return swapRoute;
      } catch (e) {
        console.log(e);
        return undefined;
      }

      return undefined;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useSwapRoute = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useSwapRoute,
  };
};
