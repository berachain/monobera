import { formatUnits, parseUnits } from "viem";

import { BZERO, MathSol } from "./basicOperations";
import { type WeightedPoolPairData } from "./weighted";

const MAX_INVARIANT_RATIO = BigInt("3000000000000000000"); // 3e18

// The following function are BigInt versions implemented by Sergio.
// BigInt was requested from integrators as it is more efficient.
// Swap outcomes formulas should match exactly those from smart contracts.
// PairType = 'token->token'
// SwapType = 'swapExactIn'
export function _calcOutGivenIn(
  balanceIn: bigint,
  weightIn: bigint,
  balanceOut: bigint,
  weightOut: bigint,
  amountIn: bigint,
  fee: bigint,
): bigint {
  // is it necessary to check ranges of variables? same for the other functions
  amountIn = subtractFee(amountIn, fee);
  const exponent = MathSol.divDownFixed(weightIn, weightOut);
  const denominator = MathSol.add(balanceIn, amountIn);
  const base = MathSol.divUpFixed(balanceIn, denominator);
  const power = MathSol.powUpFixed(base, exponent);
  return MathSol.mulDownFixed(balanceOut, MathSol.complementFixed(power));
}

// PairType = 'token->token'
// SwapType = 'swapExactOut'
export function _calcInGivenOut(
  balanceIn: bigint,
  weightIn: bigint,
  balanceOut: bigint,
  weightOut: bigint,
  amountOut: bigint,
  fee: bigint,
): bigint {
  const base = MathSol.divUpFixed(balanceOut, balanceOut - amountOut);
  const exponent = MathSol.divUpFixed(weightOut, weightIn);
  const power = MathSol.powUpFixed(base, exponent);
  const ratio = MathSol.sub(power, MathSol.ONE);
  const amountIn = MathSol.mulUpFixed(balanceIn, ratio);
  return addFee(amountIn, fee);
}

function subtractFee(amount: bigint, fee: bigint): bigint {
  const feeAmount = MathSol.mulUpFixed(amount, fee);
  return amount - feeAmount;
}

function addFee(amount: bigint, fee: bigint): bigint {
  return MathSol.divUpFixed(amount, MathSol.complementFixed(fee));
}

// TO DO - Swap old versions of these in Pool for the BigInt version
// PairType = 'token->token'
// SwapType = 'swapExactIn'
export function _spotPriceAfterSwapExactTokenInForTokenOutBigInt(
  balanceIn: bigint,
  weightIn: bigint,
  balanceOut: bigint,
  weightOut: bigint,
  amountIn: bigint,
  fee: bigint,
): bigint {
  const numerator = MathSol.mulUpFixed(balanceIn, weightOut);
  let denominator = MathSol.mulUpFixed(balanceOut, weightIn);
  const feeComplement = MathSol.complementFixed(fee);
  denominator = MathSol.mulUpFixed(denominator, feeComplement);
  const base = MathSol.divUpFixed(
    balanceIn,
    MathSol.add(MathSol.mulUpFixed(amountIn, feeComplement), balanceIn),
  );
  const exponent = MathSol.divUpFixed(weightIn + weightOut, weightOut);
  denominator = MathSol.mulUpFixed(
    denominator,
    MathSol.powUpFixed(base, exponent),
  );
  return MathSol.divUpFixed(numerator, denominator);
  //        -(
  //            (Bi * wo) /
  //            (Bo * (-1 + f) * (Bi / (Ai + Bi - Ai * f)) ** ((wi + wo) / wo) * wi)
  //        )
}

// PairType = 'token->token'
// SwapType = 'swapExactOut'
export function _spotPriceAfterSwapTokenInForExactTokenOutBigInt(
  balanceIn: bigint,
  weightIn: bigint,
  balanceOut: bigint,
  weightOut: bigint,
  amountOut: bigint,
  fee: bigint,
): bigint {
  let numerator = MathSol.mulUpFixed(balanceIn, weightOut);
  const feeComplement = MathSol.complementFixed(fee);
  const base = MathSol.divUpFixed(
    balanceOut,
    MathSol.sub(balanceOut, amountOut),
  );
  const exponent = MathSol.divUpFixed(weightIn + weightOut, weightIn);
  numerator = MathSol.mulUpFixed(numerator, MathSol.powUpFixed(base, exponent));
  const denominator = MathSol.mulUpFixed(
    MathSol.mulUpFixed(balanceOut, weightIn),
    feeComplement,
  );
  return MathSol.divUpFixed(numerator, denominator);
  //        -(
  //            (Bi * (Bo / (-Ao + Bo)) ** ((wi + wo) / wi) * wo) /
  //            (Bo * (-1 + f) * wi)
  //        )
}

/**
 * Calculates BPT for given tokens in. Note all numbers use upscaled amounts. e.g. 1USDC = 1e18.
 * @param balances Pool balances.
 * @param normalizedWeights Token weights.
 * @param amountsIn Amount of each token.
 * @param bptTotalSupply Total BPT of pool.
 * @param swapFeePercentage Swap fee percentage.
 * @returns BPT out.
 */
export function _calcBptOutGivenExactTokensIn(
  balances: bigint[],
  normalizedWeights: bigint[],
  amountsIn: bigint[],
  bptTotalSupply: bigint,
  swapFeePercentage: bigint,
): bigint {
  const balanceRatiosWithFee = new Array<bigint>(amountsIn.length);

  let invariantRatioWithFees = BZERO;
  for (let i = 0; i < balances.length; i++) {
    balanceRatiosWithFee[i] = MathSol.divDownFixed(
      MathSol.add(balances[i] ?? 0n, amountsIn[i] ?? 0n),
      balances[i] ?? 0n,
    );
    invariantRatioWithFees = MathSol.add(
      invariantRatioWithFees,
      MathSol.mulDownFixed(
        balanceRatiosWithFee[i] ?? 0n,
        normalizedWeights[i] ?? 0n,
      ),
    );
  }

  let invariantRatio = MathSol.ONE;
  for (let i = 0; i < balances.length; i++) {
    let amountInWithoutFee: bigint;

    if ((balanceRatiosWithFee[i] ?? 0n) > invariantRatioWithFees) {
      const nonTaxableAmount = MathSol.mulDownFixed(
        balances[i] ?? 0n,
        MathSol.sub(invariantRatioWithFees, MathSol.ONE),
      );
      const taxableAmount = MathSol.sub(amountsIn[i] ?? 0n, nonTaxableAmount);
      const swapFee = MathSol.mulUpFixed(taxableAmount, swapFeePercentage);
      amountInWithoutFee = MathSol.add(
        nonTaxableAmount,
        MathSol.sub(taxableAmount, swapFee),
      );
    } else {
      amountInWithoutFee = amountsIn[i] ?? 0n;
    }

    const balanceRatio = MathSol.divDownFixed(
      MathSol.add(balances[i] ?? 0n, amountInWithoutFee),
      balances[i] ?? 0n,
    );

    invariantRatio = MathSol.mulDownFixed(
      invariantRatio,
      MathSol.powDown(balanceRatio, normalizedWeights[i] ?? 0n),
    );
  }

  if (invariantRatio > MathSol.ONE) {
    return MathSol.mulDownFixed(
      bptTotalSupply,
      MathSol.sub(invariantRatio, MathSol.ONE),
    );
  } else {
    return BZERO;
  }
}

export function _calcTokensOutGivenExactBptIn(
  balances: bigint[],
  bptAmountIn: bigint,
  totalBPT: bigint,
): bigint[] {
  /**********************************************************************************************
    // exactBPTInForTokensOut                                                                    //
    // (per token)                                                                               //
    // aO = amountOut                  /        bptIn         \                                  //
    // b = balance           a0 = b * | ---------------------  |                                 //
    // bptIn = bptAmountIn             \       totalBPT       /                                  //
    // bpt = totalBPT                                                                            //
    **********************************************************************************************/

  // Since we're computing an amount out, we round down overall. This means rounding down on both the
  // multiplication and division.

  const bptRatio = MathSol.divDownFixed(bptAmountIn, totalBPT);

  const amountsOut = new Array<bigint>(balances.length);
  for (let i = 0; i < balances.length; i++) {
    amountsOut[i] = MathSol.mulDownFixed(balances[i] ?? 0n, bptRatio);
  }

  return amountsOut;
}

export function _calcTokenOutGivenExactBptIn(
  balance: bigint,
  normalizedWeight: bigint,
  bptAmountIn: bigint,
  bptTotalSupply: bigint,
  swapFeePercentage: bigint,
): bigint {
  /*****************************************************************************************
        // exactBPTInForTokenOut                                                                //
        // a = amountOut                                                                        //
        // b = balance                     /      /    totalBPT - bptIn       \    (1 / w)  \   //
        // bptIn = bptAmountIn    a = b * |  1 - | --------------------------  | ^           |  //
        // bpt = totalBPT                  \      \       totalBPT            /             /   //
        // w = weight                                                                           //
        *****************************************************************************************/

  // Token out, so we round down overall. The multiplication rounds down, but the power rounds up (so the base
  // rounds up). Because (totalBPT - bptIn) / totalBPT <= 1, the exponent rounds down.
  // Calculate the factor by which the invariant will decrease after burning BPTAmountIn
  const invariantRatio = MathSol.divUpFixed(
    MathSol.sub(bptTotalSupply, bptAmountIn),
    bptTotalSupply,
  );
  // Calculate by how much the token balance has to decrease to match invariantRatio
  const balanceRatio = MathSol.powUpFixed(
    invariantRatio,
    MathSol.divDownFixed(MathSol.ONE, normalizedWeight),
  );

  // Because of rounding up, balanceRatio can be greater than one. Using complement prevents reverts.
  const amountOutWithoutFee = MathSol.mulDownFixed(
    balance,
    MathSol.complementFixed(balanceRatio),
  );

  // We can now compute how much excess balance is being withdrawn as a result of the virtual swaps, which result
  // in swap fees.

  // Swap fees are typically charged on 'token in', but there is no 'token in' here, so we apply it
  // to 'token out'. This results in slightly larger price impact. Fees are rounded up.
  const taxableAmount = MathSol.mulUpFixed(
    amountOutWithoutFee,
    MathSol.complementFixed(normalizedWeight),
  );
  const nonTaxableAmount = MathSol.sub(amountOutWithoutFee, taxableAmount);
  const swapFee = MathSol.mulUpFixed(taxableAmount, swapFeePercentage);
  const amountOut = MathSol.add(
    nonTaxableAmount,
    MathSol.sub(taxableAmount, swapFee),
  );
  return amountOut;
}

export function _calcBptInGivenExactTokensOut(
  balances: bigint[],
  normalizedWeights: bigint[],
  amountsOut: bigint[],
  bptTotalSupply: bigint,
  swapFeePercentage: bigint,
): bigint {
  // BPT in, so we round up overall.
  const balanceRatiosWithoutFee = new Array<bigint>(amountsOut.length);

  let invariantRatioWithoutFees = BZERO;
  for (let i = 0; i < balances.length; i++) {
    balanceRatiosWithoutFee[i] = MathSol.divUpFixed(
      MathSol.sub(balances[i] ?? 0n, amountsOut[i] ?? 0n),
      balances[i] ?? 0n,
    );
    invariantRatioWithoutFees = MathSol.add(
      invariantRatioWithoutFees,
      MathSol.mulUpFixed(
        balanceRatiosWithoutFee[i] ?? 0n,
        normalizedWeights[i] ?? 0n,
      ),
    );
  }

  const invariantRatio = _computeExitExactTokensOutInvariantRatio(
    balances,
    normalizedWeights,
    amountsOut,
    balanceRatiosWithoutFee,
    invariantRatioWithoutFees,
    swapFeePercentage,
  );

  return MathSol.mulUpFixed(
    bptTotalSupply,
    MathSol.complementFixed(invariantRatio),
  );
}

export const _calcTokenInGivenExactBptOut = (
  balance: bigint,
  normalizedWeight: bigint,
  bptAmountOut: bigint,
  bptTotalSupply: bigint,
  swapFee: bigint,
): bigint => {
  /*****************************************************************************************
    // tokenInForExactBptOut                                                                //
    // a = amountIn                                                                         //
    // b = balance                      /  /     bpt + bptOut     \    (1 / w)      \       //
    // bptOut = bptAmountOut   a = b * |  | ---------------------- | ^          - 1  |      //
    // bpt = bptTotalSupply             \  \         bpt          /                 /       //
    // w = normalizedWeight                                                                 //
    *****************************************************************************************/

  // Token in, so we round up overall

  // Calculate the factor by which the invariant will increase after minting `bptAmountOut`
  const invariantRatio = MathSol.divUpFixed(
    MathSol.add(bptTotalSupply, bptAmountOut),
    bptTotalSupply,
  );
  if (invariantRatio > MAX_INVARIANT_RATIO) {
    throw new Error("MAX_OUT_BPT_FOR_TOKEN_IN");
  }

  // Calculate by how much the token balance has to increase to cause `invariantRatio`
  const balanceRatio = MathSol.powUpFixed(
    invariantRatio,
    MathSol.divUpFixed(MathSol.ONE, normalizedWeight),
  );
  const amountInWithoutFee = MathSol.mulUpFixed(
    balance,
    MathSol.sub(balanceRatio, MathSol.ONE),
  );
  // We can now compute how much extra balance is being deposited and used in virtual swaps, and charge swap fees accordingly
  const taxablePercentage = MathSol.complementFixed(normalizedWeight);
  const taxableAmount = MathSol.mulUpFixed(
    amountInWithoutFee,
    taxablePercentage,
  );
  const nonTaxableAmount = MathSol.sub(amountInWithoutFee, taxableAmount);

  return MathSol.add(
    nonTaxableAmount,
    MathSol.divUpFixed(taxableAmount, MathSol.complementFixed(swapFee)),
  );
};

/**
 * @dev Intermediate function to avoid stack-too-deep errors.
 */
function _computeExitExactTokensOutInvariantRatio(
  balances: bigint[],
  normalizedWeights: bigint[],
  amountsOut: bigint[],
  balanceRatiosWithoutFee: bigint[],
  invariantRatioWithoutFees: bigint,
  swapFeePercentage: bigint,
): bigint {
  let invariantRatio = MathSol.ONE;

  for (let i = 0; i < balances.length; i++) {
    // Swap fees are typically charged on 'token in', but there is no 'token in' here, so we apply it to
    // 'token out'. This results in slightly larger price impact.

    let amountOutWithFee;
    if (invariantRatioWithoutFees > (balanceRatiosWithoutFee[i] ?? 0n)) {
      const nonTaxableAmount = MathSol.mulDownFixed(
        balances[i] ?? 0n,
        MathSol.complementFixed(invariantRatioWithoutFees),
      );
      const taxableAmount = MathSol.sub(amountsOut[i] ?? 0n, nonTaxableAmount);
      const taxableAmountPlusFees = MathSol.divUpFixed(
        taxableAmount,
        MathSol.complementFixed(swapFeePercentage),
      );

      amountOutWithFee = MathSol.add(nonTaxableAmount, taxableAmountPlusFees);
    } else {
      amountOutWithFee = amountsOut[i];
    }

    const balanceRatio = MathSol.divDownFixed(
      MathSol.sub(balances[i] ?? 0n, amountOutWithFee ?? 0n),
      balances[i] ?? 0n,
    );

    invariantRatio = MathSol.mulDownFixed(
      invariantRatio,
      MathSol.powDown(balanceRatio, normalizedWeights[i] ?? 0n),
    );
  }
  return invariantRatio;
}

// Invariant is used to collect protocol swap fees by comparing its value between two times.
// So we can round always to the same direction. It is also used to initiate the BPT amount
// and, because there is a minimum BPT, we round down the invariant.
export function _calculateInvariant(
  normalizedWeights: bigint[],
  balances: bigint[],
): bigint {
  /**********************************************************************************************
    // invariant               _____                                                             //
    // wi = weight index i      | |      wi                                                      //
    // bi = balance index i     | |  bi ^   = i                                                  //
    // i = invariant                                                                             //
    **********************************************************************************************/

  let invariant = MathSol.ONE;
  for (let i = 0; i < normalizedWeights.length; i++) {
    invariant = MathSol.mulDownFixed(
      invariant,
      MathSol.powDown(balances[i] ?? 0n, normalizedWeights[i] ?? 0n),
    );
  }

  if (invariant < 0) throw Error("Weighted Invariant < 0");

  return invariant;
}

export function _calcDueProtocolSwapFeeBptAmount(
  totalSupply: bigint,
  previousInvariant: bigint,
  currentInvariant: bigint,
  protocolSwapFeePercentage: bigint,
): bigint {
  // We round down to prevent issues in the Pool's accounting, even if it means paying slightly less in protocol
  // fees to the Vault.
  const growth = MathSol.divDownFixed(currentInvariant, previousInvariant);

  // Shortcut in case there was no growth when comparing the current against the previous invariant.
  // This shouldn't happen outside of rounding errors, but have this safeguard nonetheless to prevent the Pool
  // from entering a locked state in which joins and exits revert while computing accumulated swap fees.
  if (growth <= MathSol.ONE) {
    return BZERO;
  }

  // Assuming the Pool is balanced and token weights have not changed, a growth of the invariant translates into
  // proportional growth of all token balances. The protocol is due a percentage of that growth: more precisely,
  // it is due `k = protocol fee * (growth - 1) * balance / growth` for each token.
  // We compute the amount of BPT to mint for the protocol that would allow it to proportionally exit the Pool and
  // receive these balances. Note that the total BPT supply will increase when minting, so we need to account for
  // this in order to compute the percentage of Pool ownership the protocol will have.

  // The formula is:
  //
  // toMint = supply * k / (1 - k)

  // We compute protocol fee * (growth - 1) / growth, as we'll use that value twice.
  // There is no need to use SafeMath since we already checked growth is strictly greater than one.
  const k = MathSol.divDownFixed(
    MathSol.mulDownFixed(protocolSwapFeePercentage, growth - MathSol.ONE),
    growth,
  );
  const numerator = MathSol.mulDownFixed(totalSupply, k);
  const denominator = MathSol.complementFixed(k);

  return denominator == BZERO
    ? BZERO
    : MathSol.divDownFixed(numerator, denominator);
}

// spotPriceAfterSwap

// PairType = 'token->token'
// SwapType = 'swapExactIn'
export function _spotPriceAfterSwapExactTokenInForTokenOut(
  amount: bigint,
  poolPairData: WeightedPoolPairData,
): bigint {
  const Bi = BigInt(
    formatUnits(poolPairData.balanceIn, poolPairData.decimalsIn),
  );
  const Bo = BigInt(
    formatUnits(poolPairData.balanceOut, poolPairData.decimalsOut),
  );
  const wi = BigInt(formatUnits(poolPairData.weightIn, 18));
  const wo = BigInt(formatUnits(poolPairData.weightOut, 18));
  const Ai = amount;
  const f = BigInt(formatUnits(poolPairData.swapFee, 18));
  return -(
    (Bi * wo) /
    (Bo * (-1n + f) * (Bi / (Ai + Bi - Ai * f)) ** ((wi + wo) / wo) * wi)
  );
}

// PairType = 'token->token'
// SwapType = 'swapExactOut'
export function _spotPriceAfterSwapTokenInForExactTokenOut(): bigint {
  // const Bi = BigInt(
  //   formatUnits(poolPairData.balanceIn, poolPairData.decimalsIn),
  // );
  // const Bo = BigInt(
  //   formatUnits(poolPairData.balanceOut, poolPairData.decimalsOut),
  // );
  // const wi = formatUnits(poolPairData.weightIn, 18);
  // const wo = formatUnits(poolPairData.weightOut, 18);
  // const Ao = amount;
  // const f = formatUnits(poolPairData.swapFee, 18);
  // return -(
  //   (Bi * (Bo / (-Ao + Bo)) ** ((wi + wo) / wi) * wo) /
  //   (Bo * (-1n + f) * wi)
  // );
  return 0n;
}

// PairType = 'token->BPT'
// SwapType = 'swapExactIn'
export function _spotPriceAfterSwapExactTokenInForBPTOut(
  amount: bigint,
  poolPairData: WeightedPoolPairData,
): bigint {
  const Bi = BigInt(
    formatUnits(poolPairData.balanceIn, poolPairData.decimalsIn),
  );
  const Bbpt = BigInt(
    formatUnits(poolPairData.balanceOut, poolPairData.decimalsOut),
  );
  const wi = BigInt(formatUnits(poolPairData.weightIn, 18));
  const Ai = amount;
  const f = BigInt(formatUnits(poolPairData.swapFee, 18));
  return (
    (Bi * ((Ai + Bi + Ai * f * (-1n + wi)) / Bi) ** (1n - wi)) /
    (Bbpt * (1n + f * (-1n + wi)) * wi)
  );
}

// PairType = 'token->BPT'
// SwapType = 'swapExactIn'
export function _spotPriceAfterSwapBptOutGivenExactTokenInBigInt(
  balanceIn: bigint,
  balanceOut: bigint,
  weightIn: bigint,
  amountIn: bigint,
  swapFeeRatio: bigint,
): bigint {
  const feeFactor =
    MathSol.ONE -
    MathSol.mulDownFixed(MathSol.complementFixed(weightIn), swapFeeRatio);
  const denominatorFactor = MathSol.powDown(
    MathSol.ONE + (amountIn * BigInt(feeFactor)) / balanceIn,
    MathSol.complementFixed(weightIn),
  );
  return MathSol.divDownFixed(
    MathSol.ONE,
    (balanceOut * weightIn * BigInt(feeFactor)) /
      (balanceIn * denominatorFactor),
  );
}

// PairType = 'BPT->token'
// SwapType = 'swapExactIn'
export function _spotPriceAfterSwapExactBPTInForTokenOut(
  amount: bigint,
  poolPairData: WeightedPoolPairData,
): bigint {
  const Bbpt = BigInt(
    formatUnits(poolPairData.balanceIn, poolPairData.decimalsIn),
  );
  const Bo = BigInt(
    formatUnits(poolPairData.balanceOut, poolPairData.decimalsOut),
  );
  const wo = BigInt(formatUnits(poolPairData.weightOut, 18));
  const Aibpt = amount;
  const f = BigInt(formatUnits(poolPairData.swapFee, 18));
  return (
    ((1n - Aibpt / Bbpt) ** ((-1n + wo) / wo) *
      Bbpt *
      (1n + f * (-1n + wo)) *
      wo) /
    Bo
  );
}

// PairType = 'BPT->token'
// SwapType = 'swapExactOut'
export function _spotPriceAfterSwapBPTInForExactTokenOut(
  amount: bigint,
  poolPairData: WeightedPoolPairData,
): bigint {
  const Bbpt = BigInt(formatUnits(poolPairData.balanceIn, 18));
  const Bo = BigInt(
    formatUnits(poolPairData.balanceOut, poolPairData.decimalsOut),
  );
  const wo = BigInt(formatUnits(poolPairData.weightOut, 18));
  const Ao = amount;
  const f = BigInt(formatUnits(poolPairData.swapFee, 18));
  return (
    (Bbpt *
      (1n + f * (-1n + wo)) *
      wo *
      (1n + (Ao * (-1n + f - f * wo)) / Bo) ** (-1n + wo)) /
    Bo
  );
}

// PairType = 'token->BPT'
// SwapType = 'swapExactOut'
export function _spotPriceAfterSwapTokenInForExactBPTOut(
  amount: bigint,
  poolPairData: WeightedPoolPairData,
): bigint {
  const Bi = BigInt(
    formatUnits(poolPairData.balanceIn, poolPairData.decimalsIn),
  );
  const Bbpt = BigInt(formatUnits(poolPairData.balanceOut, 18));
  const wi = BigInt(formatUnits(poolPairData.weightIn, 18));
  const Aobpt = amount;
  const f = BigInt(formatUnits(poolPairData.swapFee, 18));
  return (
    (((Aobpt + Bbpt) / Bbpt) ** (1n / wi) * Bi) /
    ((Aobpt + Bbpt) * (1n + f * (-1n + wi)) * wi)
  );
}

/////////
///  Derivatives of spotPriceAfterSwap
/////////

// PairType = 'token->token'
// SwapType = 'swapExactIn'
export function _derivativeSpotPriceAfterSwapExactTokenInForTokenOut(
  amount: bigint,
  poolPairData: WeightedPoolPairData,
): bigint {
  const Bi = Number(poolPairData.balanceIn);
  const Bo = Number(poolPairData.balanceOut);

  const wi = Number(formatUnits(poolPairData.weightIn, 18));
  const wo = Number(formatUnits(poolPairData.weightOut, 18));
  const Ai = Number(formatUnits(amount, 18));
  const f = Number(formatUnits(poolPairData.swapFee, 18));

  const result = (wi + wo) / (Bo * (Bi / (Ai + Bi - Ai * f)) ** (wi / wo) * wi);
  const bigintResult = parseUnits(`${result}`, 18);
  return bigintResult;
}

// PairType = 'token->token'
// SwapType = 'swapExactOut'
export function _derivativeSpotPriceAfterSwapTokenInForExactTokenOut(
  amount: bigint,
  poolPairData: WeightedPoolPairData,
): bigint {
  const Bi = BigInt(
    formatUnits(poolPairData.balanceIn, poolPairData.decimalsIn),
  );
  const Bo = BigInt(
    formatUnits(poolPairData.balanceOut, poolPairData.decimalsOut),
  );
  const wi = BigInt(formatUnits(poolPairData.weightIn, 18));
  const wo = BigInt(formatUnits(poolPairData.weightOut, 18));
  const Ao = amount;
  const f = BigInt(formatUnits(poolPairData.swapFee, 18));
  return -(
    (Bi * (Bo / (-Ao + Bo)) ** (wo / wi) * wo * (wi + wo)) /
    ((Ao - Bo) ** 2n * (-1n + f) * wi ** 2n)
  );
}

// PairType = 'token->BPT'
// SwapType = 'swapExactIn'
export function _derivativeSpotPriceAfterSwapExactTokenInForBPTOut(
  amount: bigint,
  poolPairData: WeightedPoolPairData,
): bigint {
  const Bi = BigInt(
    formatUnits(poolPairData.balanceIn, poolPairData.decimalsIn),
  );
  const Bbpt = BigInt(formatUnits(poolPairData.balanceOut, 18));
  const wi = BigInt(formatUnits(poolPairData.weightIn, 18));
  const Ai = amount;
  const f = BigInt(formatUnits(poolPairData.swapFee, 18));
  return -(
    (-1n + wi) /
    (Bbpt * ((Ai + Bi + Ai * f * (-1n + wi)) / Bi) ** wi * wi)
  );
}

// PairType = 'token->BPT'
// SwapType = 'swapExactOut'
export function _derivativeSpotPriceAfterSwapTokenInForExactBPTOut(
  amount: bigint,
  poolPairData: WeightedPoolPairData,
): bigint {
  const Bi = BigInt(
    formatUnits(poolPairData.balanceIn, poolPairData.decimalsIn),
  );
  const Bbpt = BigInt(formatUnits(poolPairData.balanceOut, 18));
  const wi = BigInt(formatUnits(poolPairData.weightIn, 18));
  const Aobpt = amount;
  const f = BigInt(formatUnits(poolPairData.swapFee, 18));
  return -(
    (((Aobpt + Bbpt) / Bbpt) ** (1n / wi) * Bi * (-1n + wi)) /
    ((Aobpt + Bbpt) ** 2n * (1n + f * (-1n + wi)) * wi ** 2n)
  );
}

// PairType = 'BPT->token'
// SwapType = 'swapExactIn'
export function _derivativeSpotPriceAfterSwapExactBPTInForTokenOut(
  amount: bigint,
  poolPairData: WeightedPoolPairData,
): bigint {
  const Bbpt = BigInt(formatUnits(poolPairData.balanceIn, 18));
  const Bo = BigInt(
    formatUnits(poolPairData.balanceOut, poolPairData.decimalsOut),
  );
  const wo = BigInt(formatUnits(poolPairData.weightOut, 18));
  const Aibpt = amount;
  const f = BigInt(formatUnits(poolPairData.swapFee, 18));
  return -(
    ((1n + f * (-1n + wo)) * (-1n + wo)) /
    ((1n - Aibpt / Bbpt) ** (1n / wo) * Bo)
  );
}

// PairType = 'BPT->token'
// SwapType = 'swapExactOut'
export function _derivativeSpotPriceAfterSwapBPTInForExactTokenOut(
  amount: bigint,
  poolPairData: WeightedPoolPairData,
): bigint {
  const Bbpt = BigInt(formatUnits(poolPairData.balanceIn, 18));
  const Bo = BigInt(
    formatUnits(poolPairData.balanceOut, poolPairData.decimalsOut),
  );
  const wo = BigInt(formatUnits(poolPairData.weightOut, 18));
  const Ao = amount;
  const f = BigInt(formatUnits(poolPairData.swapFee, 18));
  return -(
    (Bbpt *
      (1n + f * (-1n + wo)) ** 2n *
      (-1n + wo) *
      wo *
      (1n + (Ao * (-1n + f - f * wo)) / Bo) ** (-2n + wo)) /
    Bo ** 2n
  );
}
