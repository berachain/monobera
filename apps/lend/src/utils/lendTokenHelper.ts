// @ts-nocheck

import { honeyAddress } from "@bera/config";
import { formatUnits } from "viem";
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
        source_token: key,
        name: `Supplied ${tokenDictionary[key].symbol}`,
      });
      // externalTokenList.push({
      //   ...tokenDictionary[key],
      //   address: reservesDictionary[key].stableDebtTokenAddress,
      //   source_token: key,
      //   debtType: "stable",
      //   name: `Borrowed ${tokenDictionary[key].symbol} Stable`,
      // });
      externalTokenList.push({
        ...tokenDictionary[key],
        address: reservesDictionary[key].variableDebtTokenAddress,
        source_token: key,
        debtType: "variable",
        name: `Borrowed ${tokenDictionary[key].symbol} Variable`,
      });
    }
  });
  return externalTokenList;
}

export function getAssetList(
  reservesDictionary: any,
  userReservesData: any,
  BalanceToken: any[],
) {
  const supplied: any[] = [];
  const borrowed: any[] = [];
  const available_supply: any[] = [];
  const available_borrow: any[] = [];

  Object.keys(reservesDictionary).forEach((key: Address) => {
    const token = BalanceToken.find((token) => token.address === key);

    if (token) {
      if (
        userReservesData[key] &&
        userReservesData[key].scaledATokenBalance > 0n
      ) {
        const suppliedToken = {
          ...token,
          balance: userReservesData[key].scaledATokenBalance,
          formattedBalance: formatUnits(
            userReservesData[key].scaledATokenBalance,
            token.decimals,
          ),
        };
        supplied.push({
          ...suppliedToken,
          reserveData: reservesDictionary[key],
        });
      }
      available_supply.push({
        ...token,
        reserveData: reservesDictionary[key],
      });

      if (
        userReservesData[key] &&
        userReservesData[key].scaledVariableDebt > 0n
      ) {
        const variableDebtToken = {
          ...token,
          balance: userReservesData[key].scaledVariableDebt,
          formattedBalance: formatUnits(
            userReservesData[key].scaledVariableDebt,
            token.decimals,
          ),
        };
        borrowed.push({
          ...variableDebtToken,
          reserveData: reservesDictionary[key],
        });
      }
    }
  });
  const Honey = BalanceToken.find((token) => token.address === honeyAddress);
  if (Honey) {
    available_borrow.push({
      ...Honey,
      reserveData: reservesDictionary[honeyAddress],
    });
  }
  return { supplied, borrowed, available_supply, available_borrow };
}

export function getEligibleDepositAmount(
  reservesDictionary: any,
  balanceToken: any[],
) {
  let eligibleDepositAmount = 0;
  Object.keys(reservesDictionary).forEach((key: Address) => {
    const token = balanceToken.find((token) => token.address === key);
    if (token) {
      eligibleDepositAmount +=
        Number(token.formattedBalance) *
        Number(reservesDictionary[key].formattedPriceInMarketReferenceCurrency);
    }
  });
  return eligibleDepositAmount;
}
