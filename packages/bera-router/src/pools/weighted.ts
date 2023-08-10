import { formatUnits, getAddress, parseUnits } from "viem";

import { type Pool, type Token } from "~/services/PoolService/types";
import {
  PoolTypes,
  SwapTypes,
  type PoolBase,
  type PoolPairBase,
  type SubgraphToken,
} from "~/services/RouterService/types";
import {
  MathSol,
  _computeScalingFactor,
  _downscaleDown,
  _upscale,
} from "./basicOperations";
import {
  _calcBptInGivenExactTokensOut,
  _calcBptOutGivenExactTokensIn,
  _calcInGivenOut,
  _calcOutGivenIn,
  _calcTokenInGivenExactBptOut,
  _calcTokenOutGivenExactBptIn,
  _calcTokensOutGivenExactBptIn,
  _derivativeSpotPriceAfterSwapExactBPTInForTokenOut,
  _derivativeSpotPriceAfterSwapExactTokenInForBPTOut,
  _derivativeSpotPriceAfterSwapExactTokenInForTokenOut,
  _derivativeSpotPriceAfterSwapTokenInForExactTokenOut,
  _spotPriceAfterSwapBPTInForExactTokenOut,
  _spotPriceAfterSwapExactBPTInForTokenOut,
  _spotPriceAfterSwapExactTokenInForBPTOut,
  _spotPriceAfterSwapExactTokenInForTokenOut,
  _spotPriceAfterSwapTokenInForExactBPTOut,
  _spotPriceAfterSwapTokenInForExactTokenOut,
} from "./weightedMath";

enum PairTypes {
  BptToToken,
  TokenToBpt,
  TokenToToken,
}
type NoNullableField<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type WeightedPoolToken = Pick<
  NoNullableField<Token>,
  "address" | "balance" | "decimals" | "weight"
>;

export type WeightedPoolPairData = PoolPairBase & {
  pairType: PairTypes;
  weightIn: bigint;
  weightOut: bigint;
};

export class WeightedPool implements PoolBase<WeightedPoolPairData> {
  poolType: PoolTypes = PoolTypes.Weighted;
  id: string;
  address: string;
  swapFee: bigint;
  totalShares: bigint;
  tokens: any[];
  totalWeight: number;
  tokensList: string[];
  MAX_IN_RATIO = 0.3;
  MAX_OUT_RATIO = 0.3;
  isLBP = false;

  static fromPool(pool: Pool): WeightedPool {
    if (!pool.totalWeight) throw new Error("WeightedPool missing totalWeight");
    const weightedPool = new WeightedPool(
      pool.pool,
      pool.pool,
      Number(pool.swapFee),
      Number(pool.totalWeight),
      Number(pool.totalSupply),
      pool.tokens as WeightedPoolToken[],
      pool.tokens.map((t) => t.address.toLowerCase()),
    );
    return weightedPool;
  }

  constructor(
    id: string,
    address: string,
    swapFee: number,
    totalWeight: number,
    totalShares: number,
    tokens: WeightedPoolToken[],
    tokensList: string[],
  ) {
    this.id = id;
    this.address = address;
    this.swapFee = parseUnits(`${swapFee}`, 18);
    this.totalShares = parseUnits(`${totalShares}`, 18);
    this.tokens = tokens;
    this.tokensList = tokensList;
    this.totalWeight = totalWeight;
  }

  getTokens(): Token[] {
    return this.tokens as Token[];
  }
  parsePoolPairData(tokenIn: string, tokenOut: string): WeightedPoolPairData {
    const tokenIndexIn = this.tokens.findIndex(
      (t) =>
        getAddress(t.address).toLocaleLowerCase() ===
        getAddress(tokenIn).toLowerCase(),
    );
    if (tokenIndexIn < 0) throw "Pool does not contain tokenIn";
    const tI = this.tokens[tokenIndexIn];
    const balanceIn = tI?.balance;
    const decimalsIn = tI?.decimals;
    const bigWeightIn = parseUnits(
      `${Number(tI?.weight) / this.totalWeight}`,
      18,
    );
    const weightIn = bigWeightIn;

    const tokenIndexOut = this.tokens.findIndex(
      (t) =>
        getAddress(t.address).toLowerCase() ===
        getAddress(tokenOut).toLowerCase(),
    );
    if (tokenIndexOut < 0) throw "Pool does not contain tokenOut";
    const tO = this.tokens[tokenIndexOut];
    const balanceOut = tO?.balance;
    const decimalsOut = tO?.decimals;

    const weightOut = parseUnits(
      `${Number(tO?.weight) / this.totalWeight}`,
      18,
    );

    let pairType: PairTypes;
    if (tokenIn == this.address) {
      pairType = PairTypes.BptToToken;
    } else if (tokenOut == this.address) {
      pairType = PairTypes.TokenToBpt;
    } else {
      pairType = PairTypes.TokenToToken;
    }
    const poolPairData: WeightedPoolPairData = {
      id: this.id,
      address: this.address,
      poolType: this.poolType,
      tokenIn: tokenIn,
      tokenOut: tokenOut,
      decimalsIn: Number(decimalsIn),
      decimalsOut: Number(decimalsOut),
      balanceIn: balanceIn ?? 0n,
      balanceOut: balanceOut ?? 0n,
      pairType: pairType,
      weightIn: weightIn,
      weightOut: weightOut,
      swapFee: this.swapFee,
    };
    return poolPairData;
  }

  getNormalizedWeights(): bigint[] {
    return this.tokens.map((t) =>
      parseUnits(`${Number(t.weight) / this.totalWeight}`, 18),
    );
  }

  getNormalizedLiquidity(
    poolPairData: WeightedPoolPairData | undefined,
  ): bigint {
    if (!poolPairData) return 0n;
    return universalNormalizedLiquidity(
      this._derivativeSpotPriceAfterSwapExactTokenInForTokenOut(
        poolPairData,
        0n,
      ),
    );
  }

  getLimitAmountSwap(
    poolPairData: PoolPairBase | undefined,
    swapType: SwapTypes,
  ): bigint {
    if (!poolPairData) return 0n;
    if (swapType === SwapTypes.SwapExactIn) {

      return parseUnits(
        `${
          Number(formatUnits(poolPairData.balanceIn, poolPairData.decimalsIn)) *
          this.MAX_IN_RATIO
        }`,
        18,
      );
    } else {

      return parseUnits(
        `${
          Number(
            formatUnits(poolPairData.balanceOut, poolPairData.decimalsOut),
          ) * this.MAX_OUT_RATIO
        }`,
        18,
      );
    }
  }

  // Updates the balance of a given token for the pool
  updateTokenBalanceForPool(token: string, newBalance: bigint): void {
    // token is BPT
    if (this.address === token) {
      this.updateTotalShares(newBalance);
    }
    // token is underlying in the pool
    const T = this.tokens.find(
      (t) => t.address.toLowerCase() === token.toLowerCase(),
    );
    if (!T) throw Error("Pool does not contain this token");
    T.balance = newBalance;
  }

  updateTotalShares(newTotalShares: bigint): void {
    this.totalShares = newTotalShares;
  }

  // Using bigint.js decimalPlaces (dp), allows us to consider token decimal accuracy correctly,
  // i.e. when using token with 2decimals 0.002 should be returned as 0
  // Uses ROUND_DOWN mode (1)
  // calcOutGivenIn
  _exactTokenInForTokenOut(
    poolPairData: WeightedPoolPairData,
    amount: bigint,
  ): bigint {
    if (!amount) return amount;
    const amountIn = amount;
    const balanceIn = poolPairData.balanceIn;
    const balanceOut = poolPairData.balanceOut;
    const normalizedWeightIn = poolPairData.weightIn;
    const normalizedWeightOut = poolPairData.weightOut;
    const swapFee = poolPairData.swapFee;
    let returnAmt: bigint;
    try {
      if (poolPairData.pairType === PairTypes.TokenToBpt) {
        returnAmt = _calcBptOutGivenExactTokensIn(
          [balanceIn, BigInt(1)],
          [normalizedWeightIn, MathSol.ONE - normalizedWeightIn],
          [amountIn, BigInt(0)],
          balanceOut,
          swapFee,
        );
      } else if (poolPairData.pairType === PairTypes.BptToToken) {
        returnAmt = _calcTokenOutGivenExactBptIn(
          balanceOut,
          normalizedWeightOut,
          amountIn,
          balanceIn,
          swapFee,
        );
      } else {
        returnAmt = _calcOutGivenIn(
          balanceIn,
          normalizedWeightIn,
          balanceOut,
          normalizedWeightOut,
          amountIn,
          swapFee,
        );
      }
      // return human scaled
      return returnAmt;
    } catch (err) {
      return 0n;
    }
  }

  // Using bigint.js decimalPlaces (dp), allows us to consider token decimal accuracy correctly,
  // i.e. when using token with 2decimals 0.002 should be returned as 0
  // Uses ROUND_UP mode (0)
  // calcInGivenOut
  _tokenInForExactTokenOut(
    poolPairData: WeightedPoolPairData,
    amount: bigint,
  ): bigint {
    if (!amount) return amount;
    const amountOut = amount;
    const decimalsIn = poolPairData.decimalsIn;
    const decimalsOut = poolPairData.decimalsOut;
    const balanceIn = parseUnits(
      `${Number(poolPairData.balanceIn)}`,
      18 - decimalsIn,
    );
    const balanceOut = parseUnits(
      `${Number(poolPairData.balanceOut)}`,
      18 - decimalsOut,
    );
    const normalizedWeightIn = poolPairData.weightIn;
    const normalizedWeightOut = poolPairData.weightOut;
    const swapFee = poolPairData.swapFee;
    let returnAmt: bigint;
    try {
      if (poolPairData.pairType === PairTypes.TokenToBpt) {
        returnAmt = _calcTokenInGivenExactBptOut(
          balanceIn,
          normalizedWeightIn,
          amountOut,
          balanceOut,
          swapFee,
        );
      } else if (poolPairData.pairType === PairTypes.BptToToken) {
        returnAmt = _calcBptInGivenExactTokensOut(
          [balanceOut, BigInt(1)],
          [normalizedWeightOut, MathSol.ONE - normalizedWeightOut],
          [amountOut, BigInt(0)],
          balanceIn,
          swapFee,
        );
      } else {
        returnAmt = _calcInGivenOut(
          balanceIn,
          normalizedWeightIn,
          balanceOut,
          normalizedWeightOut,
          amountOut,
          swapFee,
        );
      }
      // return human scaled
      return returnAmt;
    } catch (err) {
      return 0n;
    }
  }

  /**
   * _calcTokensOutGivenExactBptIn
   * @param bptAmountIn EVM scale.
   * @returns EVM scale.
   */
  _calcTokensOutGivenExactBptIn(bptAmountIn: bigint): bigint[] {
    // balances and amounts must be normalized to 1e18 fixed point - e.g. 1USDC => 1e18 not 1e6
    const balancesNormalised = this.tokens
      .filter((t) => t.address !== this.address)
      .map((t) => normaliseBalance(t));
    try {
      const amountsOutNormalised = _calcTokensOutGivenExactBptIn(
        balancesNormalised,
        bptAmountIn,
        this.totalShares,
      );
      // We want to return denormalised amounts. e.g. 1USDC => 1e6 not 1e18
      const amountsOut = amountsOutNormalised.map((a, i) =>
        denormaliseAmount(a, this.tokens[i]),
      );
      return amountsOut.map((a) => a);
    } catch (err) {
      return new Array(balancesNormalised.length).fill(0n);
    }
  }

  /**
   * _calcBptOutGivenExactTokensIn
   * @param amountsIn EVM Scale
   * @returns EVM Scale
   */
  _calcBptOutGivenExactTokensIn(amountsIn: bigint[]): bigint {
    try {
      // balances and amounts must be normalized to 1e18 fixed point - e.g. 1USDC => 1e18 not 1e6
      const amountsInNormalised = new Array(amountsIn.length).fill(BigInt(0));
      const balancesNormalised = new Array(amountsIn.length).fill(BigInt(0));
      this.tokens
        .filter((t) => t.address !== this.address)
        .forEach((token, i) => {
          amountsInNormalised[i] = normaliseAmount(amountsIn[i] ?? 0n, token);
          balancesNormalised[i] = normaliseBalance(token);
        });
      const bptAmountOut = _calcBptOutGivenExactTokensIn(
        balancesNormalised,
        this.getNormalizedWeights(),
        amountsInNormalised,
        this.totalShares,
        this.swapFee,
      );
      return bptAmountOut;
    } catch (err) {
      return 0n;
    }
  }

  _spotPriceAfterSwapExactTokenInForTokenOut(
    poolPairData: WeightedPoolPairData,
    amount: bigint,
  ): bigint {
    if (poolPairData.pairType === PairTypes.TokenToBpt) {
      return _spotPriceAfterSwapExactTokenInForBPTOut(amount, poolPairData);
    } else if (poolPairData.pairType === PairTypes.BptToToken) {
      return _spotPriceAfterSwapExactBPTInForTokenOut(amount, poolPairData);
    } else {
      return _spotPriceAfterSwapExactTokenInForTokenOut(amount, poolPairData);
    }
  }

  _spotPriceAfterSwapTokenInForExactTokenOut(
    poolPairData: WeightedPoolPairData,
    amount: bigint,
  ): bigint {
    if (poolPairData.pairType === PairTypes.TokenToBpt) {
      return _spotPriceAfterSwapTokenInForExactBPTOut(amount, poolPairData);
    } else if (poolPairData.pairType === PairTypes.BptToToken) {
      return _spotPriceAfterSwapBPTInForExactTokenOut(amount, poolPairData);
    } else {
      return _spotPriceAfterSwapTokenInForExactTokenOut();
    }
  }

  _derivativeSpotPriceAfterSwapExactTokenInForTokenOut(
    poolPairData: WeightedPoolPairData,
    amount: bigint,
  ): bigint {
    if (poolPairData.pairType === PairTypes.TokenToBpt) {
      return _derivativeSpotPriceAfterSwapExactTokenInForBPTOut(
        amount,
        poolPairData,
      );
    } else if (poolPairData.pairType === PairTypes.BptToToken) {
      return _derivativeSpotPriceAfterSwapExactBPTInForTokenOut(
        amount,
        poolPairData,
      );
    } else {
      return _derivativeSpotPriceAfterSwapExactTokenInForTokenOut(
        amount,
        poolPairData,
      );
    }
  }

  _derivativeSpotPriceAfterSwapTokenInForExactTokenOut(
    poolPairData: WeightedPoolPairData,
    amount: bigint,
  ): bigint {
    return _derivativeSpotPriceAfterSwapTokenInForExactTokenOut(
      amount,
      poolPairData,
    );
  }
}

export function universalNormalizedLiquidity(
  derivativeSpotPriceAtZero: bigint,
): bigint {
  const ans = 1 / Number(formatUnits(derivativeSpotPriceAtZero, 18));
  if (ans === undefined || ans < 0) return 0n;
  return parseUnits(`${ans}`, 18);
}

export function normalizeBigInt(num: bigint) {
  return parseUnits(`${Number(num)}`, 18);
}

export const normaliseBalance = (
  token: Partial<Pick<SubgraphToken, "priceRate">> &
    Pick<SubgraphToken, "balance">,
): bigint => {
  return (
    parseUnits(`${Number(token.balance)}`, 18) *
    parseUnits(`${Number(token.priceRate)}` ?? "1", 18)
  );
};

// denormalises amount from 18 decimals to token decimals taking price rate into consideration.
export const denormaliseAmount = (
  amount: bigint,
  token:
    | (Partial<Pick<SubgraphToken, "priceRate">> &
        Pick<SubgraphToken, "decimals">)
    | undefined,
): bigint => {
  if (!token) return 0n;
  const amountAfterRate =
    amount / parseUnits(`${Number(token.priceRate)}` ?? `${1}`, 18);
  const scalingFactor = _computeScalingFactor(BigInt(token.decimals));
  return _downscaleDown(amountAfterRate, scalingFactor);
};
// normalizes amount as if it had 18 decimals taking price rate into consideration.
export const normaliseAmount = (
  amount: bigint,
  token: Partial<Pick<SubgraphToken, "priceRate">> &
    Pick<SubgraphToken, "decimals">,
): bigint => {
  const scalingFactor = _computeScalingFactor(BigInt(token.decimals));
  return (
    _upscale(amount, scalingFactor) *
    parseUnits(`${Number(token.priceRate)}` ?? "1", 18)
  );
};
