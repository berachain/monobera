import { Address } from "viem";
import { BeraConfig } from "..";
import { ADDRESS_ZERO } from "~/constants";

export interface SortBaseQuoteAddress {
  tokenA: Address;
  tokenB: Address;
  config: BeraConfig;
}
export const sortBaseQuoteAddresses = ({
  tokenA,
  tokenB,
  config,
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
