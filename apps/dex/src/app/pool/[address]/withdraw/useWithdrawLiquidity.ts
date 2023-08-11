import { useEffect, useState } from "react";
import { type Pool } from "@bera/bera-router";
import {
  useBeraJs,
  usePollBankBalance,
  usePollPreviewBurnShares,
  usePollPreviewRemoveLiquidityExactAmountOut,
  usePollPreviewRemoveLiquidityOneSideOut,
  useTokens,
  type Token,
} from "@bera/berajs";
import { formatUnits, parseUnits } from "viem";

export const useWithdrawLiquidity = (pool: Pool | undefined, prices: any) => {
  const { account = undefined } = useBeraJs();

  const [amount, setAmount] = useState<number>(0);

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [exactOutToken, setExactOutToken] = useState<Token | undefined>(
    undefined,
  );
  const [exactOutAmount, setExactOutAmount] = useState<number>(0);
  const [withdrawValue, setWithdrawValue] = useState<number>(0);

  const { useBankBalance, useFormattedBankBalance } = usePollBankBalance(
    pool?.shareAddress,
  );
  const lpBalance = useBankBalance();
  const formattedLpBalance = useFormattedBankBalance();
  const { tokenDictionary } = useTokens();

  const [withdrawType, setWithdrawType] = useState(0);

  const { usePreviewBurnShares } = usePollPreviewBurnShares(
    parseUnits(`${amount}`, 18),
    pool?.pool,
    pool?.poolShareDenomHex,
  );
  const burnShares: Record<string, bigint> = usePreviewBurnShares();

  useEffect(() => {
    if (burnShares) {
      const totalValue = pool?.tokens.reduce((acc, token) => {
        const formattedAmount = burnShares
          ? Number(formatUnits(burnShares[token.address] ?? 0n, token.decimals))
          : 0;

        return acc + formattedAmount * (prices[token.address] ?? 0);
      }, 0);
      setWithdrawValue(totalValue ?? 0);
    }
  }, [burnShares]);

  const { usePreviewRemoveLiquidityOneSideOut } =
    usePollPreviewRemoveLiquidityOneSideOut(pool?.pool, exactOutToken, amount);
  const previewRemoveLiquidityOneSideOut =
    usePreviewRemoveLiquidityOneSideOut();

  const { usePreviewRemoveLiquidityExactAmountOut } =
    usePollPreviewRemoveLiquidityExactAmountOut(
      pool?.pool,
      exactOutToken,
      exactOutAmount,
    );

  const previewRemoveLiquidityExactAmountOut =
    usePreviewRemoveLiquidityExactAmountOut();

  useEffect(() => {
    if (withdrawType === 1 && previewRemoveLiquidityExactAmountOut) {
      const formatted = Number(
        formatUnits(previewRemoveLiquidityExactAmountOut[1][0], 18),
      );
      setAmount(formatted);
    }
  }, [previewRemoveLiquidityExactAmountOut]);

  useEffect(() => {
    if (withdrawType === 0 && previewRemoveLiquidityOneSideOut) {
      const formatted = Number(
        formatUnits(
          previewRemoveLiquidityOneSideOut[1][0],
          exactOutToken?.decimals ?? 18,
        ),
      );
      setExactOutAmount(formatted);
    }
  }, [previewRemoveLiquidityOneSideOut]);

  const payload = [
    pool?.pool,
    account,
    account,
    pool?.poolShareDenomHex,
    parseUnits(`${amount}`, 18),
  ];

  const singlePayload = [
    pool?.pool,
    account,
    account,
    exactOutToken?.address,
    parseUnits(`${exactOutAmount}`, exactOutToken?.decimals ?? 18),
    pool?.poolShareDenomHex,
    parseUnits(`${amount * 1.1}`, 18),
  ];

  return {
    lpBalance,
    burnShares,
    withdrawValue,
    formattedLpBalance,
    setWithdrawType,
    tokenDictionary,
    amount,
    setAmount,
    previewOpen,
    setPreviewOpen,
    payload,
    singlePayload,
    exactOutToken,
    setExactOutToken,
    exactOutAmount,
    setExactOutAmount,
  };
};
