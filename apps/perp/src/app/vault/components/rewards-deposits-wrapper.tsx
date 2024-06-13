"use client";

import { useState } from "react";

import DepositWithdraw from "./deposit-withdraw";
import { RewardsWithdraw } from "./rewards-withdraw";

export const RewardsDepositsWrapper = () => {
  const [actionType, setActionType] = useState<"deposit" | "withdraw">(
    "deposit",
  );
  return (
    <>
      <DepositWithdraw actionType={actionType} setActionType={setActionType} />
      <RewardsWithdraw actionType={actionType} />
    </>
  );
};
