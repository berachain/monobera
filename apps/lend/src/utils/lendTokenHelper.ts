// @ts-nocheck

import { type Address } from "wagmi";

import { type Asset, type AssetDictionary } from "./types";

export function assetDictionaryToExternalTokenList(
  assetDictionary: AssetDictionary,
): Token[] {
  const externalTokenList: Token[] = [];
  Object.keys(assetDictionary).forEach((key: Address) => {
    externalTokenList.push({
      address: assetDictionary[key].atoken_address,
      decimals: assetDictionary[key].decimals,
      symbol: assetDictionary[key].symbol,
      name: `Supplied ${assetDictionary[key].symbol}`,
    });
    externalTokenList.push({
      address: assetDictionary[key].stable_debt_token_address,
      decimals: assetDictionary[key].decimals,
      symbol: assetDictionary[key].symbol,
      name: `Borrowed ${assetDictionary[key].symbol} Stable`,
    });
    externalTokenList.push({
      address: assetDictionary[key].variable_debt_token_address,
      decimals: assetDictionary[key].decimals,
      symbol: assetDictionary[key].symbol,
      name: `Borrowed ${assetDictionary[key].symbol} Variable`,
    });
  });
  return externalTokenList;
}

export function WalletTokenListToAssetDictionary(
  assetDictionary: AssetDictionary,
  walletTokenList: Token[],
  userStableAPR: { [key: Address]: string | undefined },
): AssetDictionary {
  Object.keys(assetDictionary).forEach((key: Address) => {
    assetDictionary[key].token = walletTokenList.find(
      (token) => token.address === key,
    );
    assetDictionary[key].atoken = walletTokenList.find(
      (token) => token.address === assetDictionary[key].atoken_address,
    );
    assetDictionary[key].stable_debt_token = walletTokenList.find(
      (token) =>
        token.address === assetDictionary[key].stable_debt_token_address,
    );
    assetDictionary[key].variable_debt_token = walletTokenList.find(
      (token) =>
        token.address === assetDictionary[key].variable_debt_token_address,
    );
    if (userStableAPR)
      assetDictionary[key].borrowStableAPR = userStableAPR[key];
  });
  return assetDictionary;
}

export function getAssetList(assetDictionary: AssetDictionary): {
  supplied: Asset[];
  borrowed: Asset[];
  available_supply: Asset[];
  available_borrow: Asset[];
} {
  const supplied: Asset[] = [];
  const borrowed: Asset[] = [];
  const available_supply: Asset[] = [];
  const available_borrow: Asset[] = [];

  Object.keys(assetDictionary).forEach((key: Address) => {
    if (assetDictionary[key]!.atoken?.balance > 0n) {
      supplied.push(assetDictionary[key]);
    } else {
      available_supply.push(assetDictionary[key]);
    }
    if (
      assetDictionary[key].stable_debt_token?.balance > 0 ||
      assetDictionary[key].variable_debt_token?.balance > 0
    ) {
      borrowed.push(assetDictionary[key]);
    } else {
      available_borrow.push(assetDictionary[key]);
    }
  });
  return { supplied, borrowed, available_supply, available_borrow };
}
