// @ts-nocheck

import { honeyAddress } from "@bera/config";
import { type Address } from "wagmi";

export function dictionaryToExternalTokenList(
  reservesDictionary: any,
  tokenDictionary: any,
): Token[] {
  const externalTokenList: Token[] = [];
  Object.keys(reservesDictionary).forEach((key: Address) => {
    if (tokenDictionary[key]) {
      externalTokenList.push({
        ...tokenDictionary[key],
        address: reservesDictionary[key].aTokenAddress,
        name: `Supplied ${tokenDictionary[key].symbol}`,
      });
      externalTokenList.push({
        ...tokenDictionary[key],
        address: reservesDictionary[key].stableDebtTokenAddress,
        name: `Borrowed ${tokenDictionary[key].symbol} Stable`,
      });
      externalTokenList.push({
        ...tokenDictionary[key],
        address: reservesDictionary[key].variableDebtTokenAddress,
        name: `Borrowed ${tokenDictionary[key].symbol} Variable`,
      });
    }
  });
  return externalTokenList;
}

export function getAssetList(reservesDictionary: any, BalanceToken: any[]) {
  const supplied: any[] = [];
  const borrowed: any[] = [];
  const available_supply: any[] = [];
  const available_borrow: any[] = [];

  Object.keys(reservesDictionary).forEach((key: Address) => {
    const suppliedToken = BalanceToken.find(
      (token) => token.address === reservesDictionary[key].aTokenAddress,
    );
    if (suppliedToken) {
      if (suppliedToken.balance > 0n) {
        supplied.push({
          ...suppliedToken,
          reserveData: { ...reservesDictionary[key], address: key },
        });
      } else {
        available_supply.push({
          ...BalanceToken.find((token) => token.address === key),
          reserveData: { ...reservesDictionary[key], address: key },
        });
      }
    }

    const stableDebtToken = BalanceToken.find(
      (token) =>
        token.address === reservesDictionary[key].stableDebtTokenAddress,
    );
    if (stableDebtToken && stableDebtToken.balance > 0n) {
      borrowed.push({
        ...stableDebtToken,
        reserveData: { ...reservesDictionary[key], address: key },
      });
    }

    const variableDebtToken = BalanceToken.find(
      (token) =>
        token.address === reservesDictionary[key].variableDebtTokenAddress,
    );
    if (variableDebtToken && variableDebtToken.balance > 0n) {
      borrowed.push({
        ...variableDebtToken,
        reserveData: { ...reservesDictionary[key], address: key },
      });
    }
  });

  const Honey = BalanceToken.find((token) => token.address === honeyAddress);
  if (Honey) {
    available_borrow.push({
      ...Honey,
      reserveData: {
        ...reservesDictionary[honeyAddress],
        address: honeyAddress,
      },
    });
  }

  return { supplied, borrowed, available_supply, available_borrow };
}
