import { useState } from "react";
import { useTokens } from "@bera/berajs";
import { type PoolV2 } from "../pools/fetchPools";
import { useCrocPoolPrice } from "~/hooks/useCrocPoolPrice";

export const useWithdrawLiquidity = (pool: PoolV2) => {
  const [amount, setAmount] = useState<number>(0);

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const { tokenDictionary } = useTokens();
  const { usePoolPrice } = useCrocPoolPrice(pool);
  const poolPrice = usePoolPrice();
  return {
    poolPrice,
    tokenDictionary,
    amount,
    setAmount,
    previewOpen,
    setPreviewOpen,
  };
};
