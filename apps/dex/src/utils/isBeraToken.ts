import { type Token } from "@bera/berajs";
import { beraTokenAddress, nativeTokenAddress } from "@bera/config";

export const isBeratoken = (token: Token | undefined) => {
  console.log("isBeratoken");

  if (token === undefined) return false;

  if (
    token.address.toLowerCase() === beraTokenAddress.toLowerCase() ||
    token.address.toLowerCase() === nativeTokenAddress.toLowerCase()
  ) {
    return true;
  }

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
