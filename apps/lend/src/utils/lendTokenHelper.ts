
export function getEligibleDepositAmount(reserves: any[], balanceToken: any[]) {
  let eligibleDepositAmount = 0;
  reserves.forEach((reserve: any) => {
    const token = balanceToken.find(
      (token) => token.address === reserve.underlyingAsset,
    );
    if (token) {
      eligibleDepositAmount +=
        Number(token.formattedBalance) *
        Number(reserve.formattedPriceInMarketReferenceCurrency);
    }
  });
  return eligibleDepositAmount;
}
