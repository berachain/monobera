import { useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

import {
  DEFAULT_SLIPPAGE,
  SLIPPAGE_DEGEN_VALUE,
  SLIPPAGE_MODE,
  SLIPPAGE_TOLERANCE_TYPE,
  SLIPPAGE_TOLERANCE_VALUE,
} from "../settings";

export {
  DEFAULT_SLIPPAGE,
  SLIPPAGE_DEGEN_VALUE,
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
      if (slippage > 100) {
        return 100;
      }
      return slippage;
    }
    if (slippageMode === SLIPPAGE_MODE.DEGEN) {
      return SLIPPAGE_DEGEN_VALUE;
    }
  }, [slippageMode, slippage]);
};
