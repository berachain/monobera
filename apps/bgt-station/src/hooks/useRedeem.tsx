import { useEffect, useState } from "react";
import { useBeraJs } from "@bera/berajs";
import { parseUnits } from "ethers";

export const useRedeem = () => {
  const [redeemAmount, setRedeemAmount] = useState<string>("");
  const [payload, setPayload] = useState<any[]>([]);
  const { account } = useBeraJs();

  useEffect(() => {
    const newPayload = [
      account,
      parseUnits(redeemAmount === "" ? "0" : redeemAmount, 18),
    ];
    setPayload(newPayload);
  }, [account, redeemAmount]);

  return {
    redeemAmount,
    payload,
    setRedeemAmount,
  };
};
