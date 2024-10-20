import { useState } from "react";
import { useTokens, type PoolV2 } from "@bera/berajs";

import { useCrocPoolPrice } from "~/hooks/useCrocPoolPrice";

export const useWithdrawLiquidity = (pool: PoolV2 | undefined) => {
  const [amount, setAmount] = useState<number>(0);

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const { data: tokenData } = useTokens();
  const { usePoolPrice } = useCrocPoolPrice(pool);
  const poolPrice = usePoolPrice();
  return {
    poolPrice,
    tokenDictionary: tokenData?.tokenDictionary,
    amount,
    setAmount,
    previewOpen,
    setPreviewOpen,
  };
};
