import { Address, maxUint256, parseUnits } from "viem";

import { Token } from "~/types";

export interface bendTxnPayload {
  token: Token;
  amount: string;
  account: Address;
  max?: boolean;
}

export const getSupplyPayload = ({ args }: { args: bendTxnPayload }) => {
  const { token, amount, account } = args;

  const payload = [
    token.address,
    parseUnits(amount, token.decimals),
    account,
    token.decimals,
  ];
  return payload;
};

export const getWithdrawPayload = ({ args }: { args: bendTxnPayload }) => {
  const { token, amount, max, account } = args;
  const payload = [
    token.address,
    max ? maxUint256 : parseUnits(amount, token.decimals),
    account,
  ];
  return payload;
};

export const getBorrowPayload = ({ args }: { args: bendTxnPayload }) => {
  const { token, amount, account } = args;
  const payload = [
    token.address,
    parseUnits(amount, token.decimals),
    2,
    0,
    account,
  ];
  return payload;
};

export const getRepayPayload = ({ args }: { args: bendTxnPayload }) => {
  const { token, amount, max, account } = args;
  const payload = [
    token.address,
    max ? maxUint256 : parseUnits(amount, token.decimals),
    2,
    account,
  ];
  return payload;
};
