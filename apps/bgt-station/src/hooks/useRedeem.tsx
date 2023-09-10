import { useEffect, useState } from "react";
import { useBeraJs } from "@bera/berajs";
import { parseUnits } from "viem";

export const useRedeem = () => {
  const [redeemAmount, setRedeemAmount] = useState<number | undefined>(
    undefined,
  );
  const [payload, setPayload] = useState<any[]>([]);
  const { account } = useBeraJs();

  useEffect(() => {
    const newPayload = [
      account,
      account,
      parseUnits(`${redeemAmount ?? 0}`, 18),
    ];
    setPayload(newPayload);
  }, [account, redeemAmount]);

  return {
    redeemAmount,
    payload,
    setRedeemAmount,
  };
};
