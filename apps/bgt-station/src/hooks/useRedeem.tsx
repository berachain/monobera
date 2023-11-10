import { useEffect, useState } from "react";
import { useBeraJs } from "@bera/berajs";
import { parseUnits } from "viem";

import { getSafeNumber } from "~/utils/getSafeNumber";

export const useRedeem = () => {
  const [redeemAmount, setRedeemAmount] = useState<string>("");
  const [payload, setPayload] = useState<any[]>([]);
  const { account } = useBeraJs();

  useEffect(() => {
    const newPayload = [
      account,
      account,
      parseUnits(`${getSafeNumber(redeemAmount) ?? 0}`, 18),
    ];
    setPayload(newPayload);
  }, [account, redeemAmount]);

  return {
    redeemAmount,
    payload,
    setRedeemAmount,
  };
};
