import { type CrocContext } from "@bera/beracrocswap/dist/context";
import { CrocTokenView } from "@bera/beracrocswap/dist/tokens";
import { type Token, useCrocEnv } from "@bera/berajs";
import { useMemo } from "react";

export const useCrocToken = (
  token: Token | undefined,
): CrocTokenView | undefined => {
  const crocenv = useCrocEnv();

  return useMemo(() => {
    if (!token || !crocenv.crocEnv) {
      return undefined;
    }

    const crocContext: Promise<CrocContext> = crocenv.crocEnv.context;

    return new CrocTokenView(crocContext, token.address, token.decimals);
  }, [crocenv, token]);
};
