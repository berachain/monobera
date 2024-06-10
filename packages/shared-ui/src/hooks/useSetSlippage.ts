import { useLocalStorage } from "usehooks-ts";

import {
  DEFAULT_SLIPPAGE,
  SLIPPAGE_MODE,
  SLIPPAGE_TOLERANCE_TYPE,
  SLIPPAGE_TOLERANCE_VALUE,
} from "../settings";

export const useSetSlippage = () => {
  const [, setSlippageMode] = useLocalStorage<SLIPPAGE_MODE>(
    SLIPPAGE_TOLERANCE_TYPE,
    SLIPPAGE_MODE.CUSTOM,
  );
  const [, setSlippage] = useLocalStorage<number>(
    SLIPPAGE_TOLERANCE_VALUE,
    DEFAULT_SLIPPAGE,
  );

  return { setSlippageMode, setSlippage };
};
