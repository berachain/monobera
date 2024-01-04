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
import { parseUnits } from "ethers";
import { formatUnits } from "viem";

import { getSafeNumber } from "~/utils/getSafeNumber";

export const useWithdrawLiquidity = (pool: Pool | undefined, prices: any) => {
  const { account = undefined } = useBeraJs();

  const [amount, setAmount] = useState<string>("");

  const safeAmount = amount === "" ? "0" : amount;
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [exactOutToken, setExactOutToken] = useState<Token | undefined>(
    undefined,
  );
  const [exactOutAmount, setExactOutAmount] = useState<string>("");
  const safeExactAmountOut = exactOutAmount === "" ? "0" : exactOutAmount;
  const [withdrawValue, setWithdrawValue] = useState<string>("");
  const [isPoolTokenExceeding, setIsPoolTokenExceeding] =
    useState<boolean>(false);
  const { useBankBalance, useFormattedBankBalance } = usePollBankBalance(
    pool?.shareAddress,
  );
  const lpBalance = useBankBalance();
  const formattedLpBalance = useFormattedBankBalance();
  const { tokenDictionary } = useTokens();

  const [withdrawType, setWithdrawType] = useState(0);

  const { usePreviewBurnShares } = usePollPreviewBurnShares(
    parseUnits(safeAmount, 18),
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
      setWithdrawValue(totalValue?.toString() ?? "");
    }
  }, [burnShares]);

  const { usePreviewRemoveLiquidityOneSideOut } =
    usePollPreviewRemoveLiquidityOneSideOut(
      pool?.pool,
      exactOutToken,
      safeAmount,
    );
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
      const formatted = formatUnits(
        previewRemoveLiquidityExactAmountOut[1][0],
        18,
      );
      setAmount(formatted);
    }
  }, [previewRemoveLiquidityExactAmountOut]);

  useEffect(() => {
    if (withdrawType === 0 && previewRemoveLiquidityOneSideOut) {
      const formatted = formatUnits(
        previewRemoveLiquidityOneSideOut[1][0],
        exactOutToken?.decimals ?? 18,
      );

      setExactOutAmount(formatted);
    }
  }, [previewRemoveLiquidityOneSideOut]);

  const payload = [
    pool?.pool,
    account,
    pool?.poolShareDenomHex,
    parseUnits(safeAmount, 18),
  ];

  const s = BigInt(10 * 10 ** 18);
  const parsedAmount = parseUnits(safeAmount, 18);
  const maxAmountIn =
    parsedAmount + (parsedAmount * s) / BigInt(100 * 10 ** 18);

  const singlePayload = [
    pool?.pool,
    account,
    exactOutToken?.address,
    parseUnits(safeExactAmountOut, exactOutToken?.decimals ?? 18),
    pool?.poolShareDenomHex,
    maxAmountIn,
  ];

  return {
    isMultiTokenDisabled: isPoolTokenExceeding || getSafeNumber(amount) === 0,
    isSingleTokenDisabled:
      isPoolTokenExceeding ||
      getSafeNumber(amount) === 0 ||
      exactOutToken === undefined,
    setIsPoolTokenExceeding,
    lpBalance,
    burnShares,
    withdrawValue,
    formattedLpBalance: formattedLpBalance,
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
