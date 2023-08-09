import { useState } from "react";
import { type Pool } from "@bera/bera-router";
import {
  useBeraJs,
  usePollBankBalance,
  useTokens,
  type Token,
} from "@bera/berajs";
import { parseUnits } from "viem";

export const useWithdrawLiquidity = (pool: Pool | undefined, _prices: any) => {
  const { account = undefined } = useBeraJs();

  const [amount, setAmount] = useState<number>(0);

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [exactOutToken, setExactOutToken] = useState<Token | undefined>(
    undefined,
  );
  const [exactOutAmount, setExactOutAmount] = useState<number>(0);

  const { useBankBalance } = usePollBankBalance(pool?.shareAddress);
  const lpBalance = useBankBalance();
  const { tokenDictionary } = useTokens();

  const payload = [
    pool?.pool,
    account,
    account,
    "0x599D8d33253361f1dc654e6f9C2813Bd392eC0d5",
    parseUnits(`${amount}`, 18),
  ];

  return {
    lpBalance,
    tokenDictionary,
    amount,
    setAmount,
    previewOpen,
    setPreviewOpen,
    payload,
    exactOutToken,
    setExactOutToken,
    exactOutAmount,
    setExactOutAmount,
  };
};
