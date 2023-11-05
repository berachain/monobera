import { useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

import {
  DEFAULT_SLIPPAGE,
  SLIPPAGE_MODE,
  SLIPPAGE_TOLERANCE_TYPE,
  SLIPPAGE_TOLERANCE_VALUE,
} from "../settings";

export const useSlippage = () => {
  const [slippageMode] = useLocalStorage<SLIPPAGE_MODE>(
    SLIPPAGE_TOLERANCE_TYPE,
    SLIPPAGE_MODE.AUTO,
  );
  const [slippage] = useLocalStorage<number>(
    SLIPPAGE_TOLERANCE_VALUE,
    DEFAULT_SLIPPAGE,
  );

  return useMemo(() => {
    if (slippageMode === SLIPPAGE_MODE.AUTO) {
      return DEFAULT_SLIPPAGE;
    }
    if (slippageMode === SLIPPAGE_MODE.CUSTOM) {
      return slippage;
    }
    if (slippageMode === SLIPPAGE_MODE.DEGEN) {
      return 80;
    }
  }, [slippageMode, slippage]);
};
