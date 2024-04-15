import { Address, maxUint256, parseUnits } from "viem";

import { Token } from "~/api";

export const getSupplyPayload = ({
  token,
  amount,
  account,
}: {
  token: Token;
  amount: string;
  account: Address;
}) => {
  const payload = [
    token.address,
    parseUnits(amount, token.decimals),
    account,
    token.decimals,
  ];
  return payload;
};

export const getWithdrawPayload = ({
  token,
  amount,
  withdrawMax,
  account,
}: {
  token: Token;
  amount: string;
  withdrawMax?: boolean;
  account: Address;
}) => {
  const payload = [
    token.address,
    withdrawMax ? maxUint256 : parseUnits(amount, token.decimals),
    account,
  ];
  return payload;
};

export const getBorrowPayload = ({
  token,
  amount,
  account,
}: {
  token: Token;
  amount: string;
  account: Address;
}) => {
  const payload = [
    token.address,
    parseUnits(amount, token.decimals),
    2,
    0,
    account,
  ];
  return payload;
};

export const getRepayPayload = ({
  token,
  amount,
  repayMax,
  account,
}: {
  token: Token;
  amount: string;
  repayMax?: boolean;
  account: Address;
}) => {
  const payload = [
    token.address,
    repayMax ? maxUint256 : parseUnits(amount, token.decimals),
    2,
    account,
  ];
  return payload;
};
