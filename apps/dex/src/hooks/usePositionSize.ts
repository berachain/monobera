import { useEffect, useState } from "react";
import { type Pool } from "@bera/bera-router";
import {
  usePollBankBalance,
  usePollPreviewBurnShares,
  usePollPrices,
  type Token,
} from "@bera/berajs";
import { formatUnits } from "ethers";

export const usePositionSize = ({ pool }: { pool: Pool | undefined }) => {
  const [userTotalValue, setUserTotalValue] = useState<number | undefined>(
    undefined,
  );

  const [isPositionSizeLoading, setIsPositionSizeLoading] =
    useState<boolean>(true);
  const { usePrices } = usePollPrices();
  const { data: prices } = usePrices();
  const { useBankBalance } = usePollBankBalance(pool?.shareAddress ?? "");
  const shareBalance = useBankBalance();
  const isBalanceLoading = shareBalance === undefined;
  const { usePreviewBurnShares } = usePollPreviewBurnShares(
    shareBalance,
    pool?.pool,
    pool?.poolShareDenomHex,
  );

  const burnShares: Record<string, bigint> = usePreviewBurnShares();

  useEffect(() => {
    console.log(burnShares, prices, pool, shareBalance);
    if (
      (burnShares &&
        Object.keys(burnShares).length === 0 &&
        !isBalanceLoading) ||
      (shareBalance !== undefined && shareBalance === 0n && !isBalanceLoading)
    ) {
      setUserTotalValue(0);
      setIsPositionSizeLoading(false);
    }
    if (
      burnShares &&
      Object.keys(burnShares).length !== 0 &&
      prices &&
      !isBalanceLoading
    ) {
      const totalValue = pool?.tokens.reduce((acc, token) => {
        const formattedAmount = burnShares
          ? Number(formatUnits(burnShares[token.address] ?? 0n, token.decimals))
          : 0;

        const poolToken = pool.tokens.find(
          (val: Token) =>
            val.address.toLowerCase() === token.address.toLowerCase(),
        );
        const poolTokenPrice = Number(poolToken?.latestPriceUsd ?? 0);
        return acc + formattedAmount * poolTokenPrice;
      }, 0);
      setIsPositionSizeLoading(false);
      setUserTotalValue(totalValue ?? 0);
    }
  }, [burnShares, pool, shareBalance]);

  return { userTotalValue, isPositionSizeLoading };
};
