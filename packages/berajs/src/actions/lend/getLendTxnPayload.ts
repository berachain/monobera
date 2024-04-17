import { Address, maxUint256, parseUnits } from "viem";

import { PayloadReturnType, Token } from "~/types";

export interface bendTxnPayload {
  token: Token;
  amount: string;
  account: Address;
  max?: boolean;
}

export const getLendSupplyPayload = ({
  args: { token, amount, account },
}: {
  args: bendTxnPayload;
}): PayloadReturnType<[Address, bigint, Address, number]> => {
  const payload: [Address, bigint, Address, number] = [
    token.address,
    parseUnits(amount, token.decimals),
    account,
    token.decimals,
  ];
  return { payload };
};

export const getLendWithdrawPayload = ({
  args,
}: {
  args: bendTxnPayload;
}): PayloadReturnType<[Address, bigint, Address]> => {
  const { token, amount, max, account } = args;
  const payload: [Address, bigint, Address] = [
    token.address,
    max ? maxUint256 : parseUnits(amount, token.decimals),
    account,
  ];
  return { payload };
};

export const getLendBorrowPayload = ({
  args,
}: {
  args: bendTxnPayload;
}): PayloadReturnType<[Address, bigint, 2, 0, Address]> => {
  const { token, amount, account } = args;
  const payload: [Address, bigint, 2, 0, Address] = [
    token.address,
    parseUnits(amount, token.decimals),
    2,
    0,
    account,
  ];
  return { payload };
};

export const getLendRepayPayload = ({
  args,
}: {
  args: bendTxnPayload;
}): PayloadReturnType<[Address, bigint, 2, Address]> => {
  const { token, amount, max, account } = args;
  const payload: [Address, bigint, 2, Address] = [
    token.address,
    max ? maxUint256 : parseUnits(amount, token.decimals),
    2,
    account,
  ];
  return { payload };
};
