import { CrocPoolView, getBeraLpAddress } from "@bera/beracrocswap";
import { CrocContext, connectCroc } from "@bera/beracrocswap/dist/context";
import { CrocTokenView } from "@bera/beracrocswap/dist/tokens";
import BigNumber from "bignumber.js";
import { PublicClient, erc20Abi } from "viem";

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
    const baseTokenPrice = pool.baseInfo.usdValue;
    const quoteTokenPrice = pool.quoteInfo.usdValue;

    const lpBalanceCall = publicClient.readContract({
      address: getBeraLpAddress(pool.base, pool.quote) as any,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account],
    });

    const [lpBalance] = await Promise.all([lpBalanceCall]);

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

    const baseAmount = liq.times(sqrtPrice);
    const quoteAmount = liq.div(sqrtPrice);

    const baseDecimals = pool.baseInfo.decimals;
    const quoteDecimals = pool.quoteInfo.decimals;
    const formattedBaseAmount = baseAmount
      .div(10 ** baseDecimals)
      .toString()
      .includes("e")
      ? "0"
      : baseAmount.div(10 ** baseDecimals).toString();
    const formattedQuoteAmount = quoteAmount
      .div(10 ** quoteDecimals)
      .toString()
      .includes("e")
      ? "0"
      : quoteAmount.div(10 ** quoteDecimals).toString();

    const estimatedHoneyValue =
      Number(baseTokenPrice) * Number(formattedBaseAmount) +
      Number(quoteTokenPrice) * Number(formattedQuoteAmount);

    const baseHoneyValue = Number(baseTokenPrice) * Number(formattedBaseAmount);

    const quoteHoneyValue =
      Number(quoteTokenPrice) * Number(formattedQuoteAmount);

    const userPosition: IUserPosition = {
      baseAmount,
      quoteAmount,
      formattedBaseAmount,
      formattedQuoteAmount,
      estimatedHoneyValue,
      baseHoneyValue: baseHoneyValue.toString(),
      quoteHoneyValue: quoteHoneyValue.toString(),
      seeds: lpBalance,
    };
    return {
      ...userPosition,
    };
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
