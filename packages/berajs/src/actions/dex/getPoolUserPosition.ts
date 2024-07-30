import { CrocPoolView, QUERY_ABI } from "@bera/beracrocswap";
import { CrocContext, connectCroc } from "@bera/beracrocswap/dist/context";
import { CrocTokenView } from "@bera/beracrocswap/dist/tokens";
import { crocQueryAddress } from "@bera/config";
import BigNumber from "bignumber.js";
import { Address, PublicClient, erc20Abi } from "viem";
import { bexQueryAbi } from "~/abi";
import { POOLID } from "~/constants";

import { clientToProvider } from "~/hooks/useEthersProvider";
import { IUserPosition, PoolV2 } from "~/types";
import { BeraConfig } from "~/types/global";

interface GetPoolUserPositionProps_Args {
  pool: PoolV2 | undefined;
  account: `0x${string}`;
}

interface GetPoolUserPositionProps {
  args: GetPoolUserPositionProps_Args;
  config: BeraConfig;
  publicClient: PublicClient;
}

export const getPoolUserPosition = async ({
  args: { pool, account },
  config,
  publicClient,
}: GetPoolUserPositionProps): Promise<IUserPosition | undefined> => {
  if (!publicClient) return undefined;
  if (!account || !pool) {
    return undefined;
  }
  try {
    const baseInfo = pool.baseInfo;
    const quoteInfo = pool.quoteInfo;

    let formattedBaseAmount = "0";
    let formattedQuoteAmount = "0";

    let baseAmount = new BigNumber(0);
    let quoteAmount = new BigNumber(0);

    let seeds = new BigNumber(0);

    if (pool.poolIdx === POOLID.STABLE) {
      const queryRangePosition = await publicClient.readContract({
        address: crocQueryAddress,
        abi: bexQueryAbi,
        functionName: "queryRangeTokens",
        args: [
          account,
          baseInfo.address,
          quoteInfo.address,
          pool.poolIdx,
          -20n,
          20n,
        ],
      });

      console.log("queryRangePosition", queryRangePosition);
      const provider = clientToProvider(publicClient);
      const crocContext: Promise<CrocContext> = connectCroc(provider);
      const baseCrocToken = new CrocTokenView(
        crocContext,
        pool.baseInfo.address,
        pool.baseInfo.decimals,
      );
      const quoteCrocToken = new CrocTokenView(
        crocContext,
        pool.quoteInfo.address,
        pool.quoteInfo.decimals,
      );
      const crocPool: CrocPoolView = new CrocPoolView(
        quoteCrocToken,
        baseCrocToken,
        crocContext,
      );

      const spotPrice = await crocPool.spotPricePoolIdx(pool.poolIdx);

      const sqrtPrice = new BigNumber(Math.sqrt(spotPrice));

      seeds = new BigNumber((queryRangePosition as string).toString());

      baseAmount = seeds.times(sqrtPrice);
      quoteAmount = seeds.div(sqrtPrice);

      const baseDecimals = pool.baseInfo.decimals;
      const quoteDecimals = pool.quoteInfo.decimals;
      formattedBaseAmount = baseAmount
        .div(10 ** baseDecimals)
        .toString()
        .includes("e")
        ? "0"
        : baseAmount.div(10 ** baseDecimals).toString();
      formattedQuoteAmount = quoteAmount
        .div(10 ** quoteDecimals)
        .toString()
        .includes("e")
        ? "0"
        : quoteAmount.div(10 ** quoteDecimals).toString();
    } else {
      const lpBalance = await publicClient.readContract({
        address: pool.shareAddress as Address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account],
      });

      const provider = clientToProvider(publicClient);
      const crocContext: Promise<CrocContext> = connectCroc(provider);
      const baseCrocToken = new CrocTokenView(
        crocContext,
        pool.baseInfo.address,
        pool.baseInfo.decimals,
      );
      const quoteCrocToken = new CrocTokenView(
        crocContext,
        pool.quoteInfo.address,
        pool.quoteInfo.decimals,
      );
      const crocPool: CrocPoolView = new CrocPoolView(
        quoteCrocToken,
        baseCrocToken,
        crocContext,
      );

      const spotPrice = await crocPool.spotPricePoolIdx(pool.poolIdx);

      const sqrtPrice = new BigNumber(Math.sqrt(spotPrice));

      const liq = new BigNumber(lpBalance.toString());

      baseAmount = liq.times(sqrtPrice);
      quoteAmount = liq.div(sqrtPrice);

      const baseDecimals = pool.baseInfo.decimals;
      const quoteDecimals = pool.quoteInfo.decimals;
      formattedBaseAmount = baseAmount
        .div(10 ** baseDecimals)
        .toString()
        .includes("e")
        ? "0"
        : baseAmount.div(10 ** baseDecimals).toString();
      formattedQuoteAmount = quoteAmount
        .div(10 ** quoteDecimals)
        .toString()
        .includes("e")
        ? "0"
        : quoteAmount.div(10 ** quoteDecimals).toString();
    }

    const estimatedHoneyValue =
      Number(baseInfo.usdValue) * Number(formattedBaseAmount) +
      Number(quoteInfo.usdValue) * Number(formattedQuoteAmount);

    const baseHoneyValue =
      Number(baseInfo.usdValue) * Number(formattedBaseAmount);

    const quoteHoneyValue =
      Number(quoteInfo.usdValue) * Number(formattedQuoteAmount);

    const userPosition: IUserPosition = {
      baseAmount,
      quoteAmount,
      formattedBaseAmount,
      formattedQuoteAmount,
      estimatedHoneyValue,
      baseHoneyValue: baseHoneyValue.toString(),
      quoteHoneyValue: quoteHoneyValue.toString(),
      seeds,
    };
    return {
      ...userPosition,
    };
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
