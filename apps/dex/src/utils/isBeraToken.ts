import { type Token } from "@bera/berajs";

export const isBeratoken = (token: Token | undefined) => {
  if (token === undefined) return false;
  if (
    token.address === process.env.NEXT_PUBLIC_WBERA_ADDRESS ||
    token.address === process.env.NEXT_PUBLIC_BERA_ADDRESS
  )
    return true;

  return false;
};

export const isBera = (token: Token | undefined) => {
  if (token === undefined) return false;
  if (token.address === process.env.NEXT_PUBLIC_BERA_ADDRESS) return true;

  return false;
};

export const isWBera = (token: Token | undefined) => {
  if (token === undefined) return false;
  if (token.address === process.env.NEXT_PUBLIC_WBERA_ADDRESS) return true;

  return false;
};
