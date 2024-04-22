import { Address } from "viem";

import { BeraConfig, defaultBeraConfig } from "..";

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export interface SortBaseQuoteAddress {
  tokenA: Address;
  tokenB: Address;
  config?: BeraConfig;
}
export const sortBaseQuoteAddresses = ({
  tokenA,
  tokenB,
  config = defaultBeraConfig,
}: SortBaseQuoteAddress): [Address, Address] => {
  if (!config.contracts?.wrappedTokenAddress) {
    throw new Error("Wrapped token address not found in config");
  }
  if (tokenA === ADDRESS_ZERO) {
    return config.contracts.wrappedTokenAddress.toLowerCase() >
      tokenB.toLowerCase()
      ? [tokenB, tokenA]
      : [tokenA, tokenB];
  }

  if (tokenB === ADDRESS_ZERO) {
    return config.contracts.wrappedTokenAddress.toLowerCase() <
      tokenA.toLowerCase()
      ? [tokenB, tokenA]
      : [tokenA, tokenB];
  }

  return tokenA.toLowerCase() < tokenB.toLowerCase()
    ? [tokenA, tokenB]
    : [tokenB, tokenA];
};
