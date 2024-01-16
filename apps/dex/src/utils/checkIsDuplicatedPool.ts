export const poolNameExisted = (nameInput: string, poolName: string) => {
  return nameInput === poolName;
};

export const poolSwapFeeExisted = (
  swapFeeInput: number,
  poolSwapFee: number,
) => {
  return swapFeeInput * 1e16 == poolSwapFee;
};

export const poolTokenWeightsExisted = (tokensInput: any, poolsTokens: any) => {
  for (const token1 of tokensInput) {
    const equivalentExists = poolsTokens.some((token2: any) => {
      return token1.symbol === token2.symbol && token1.weight === token2.weight;
    });

    if (!equivalentExists) {
      return true;
    }
  }
  return false;
};
