import { CrocPoolView } from "@bera/beracrocswap";
import { CrocContext, connectCroc } from "@bera/beracrocswap/dist/context";
import { CrocTokenView } from "@bera/beracrocswap/dist/tokens";
import BigNumber from "bignumber.js";
import { PublicClient, erc20Abi, getAddress } from "viem";

import { clientToProvider } from "~/hooks/useEthersProvider";
import { IUserPosition, PoolV2 } from "~/types";
import { BeraConfig } from "~/types/global";
import { getBeraLpAddress } from "~/utils";
import { getTokenHoneyPrices } from "../honey";

interface GetPoolUserPositionProps_Args {
  pool: PoolV2;
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
    const prices = getTokenHoneyPrices({
      tokenAddresses: [pool.base, pool.quote],
      config,
    });

    const lpBalanceCall = publicClient.readContract({
      address: getBeraLpAddress({
        base: pool.base,
        quote: pool.quote,
      }) as any,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account],
    });

    const [tokenHoneyPrices, lpBalance] = await Promise.all([
      prices,
      lpBalanceCall,
    ]);

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

    const formattedBaseAmount = baseAmount
      .div(10 ** 18)
      .toString()
      .includes("e")
      ? "0"
      : baseAmount.div(10 ** 18).toString();
    const formattedQuoteAmount = quoteAmount
      .div(10 ** 18)
      .toString()
      .includes("e")
      ? "0"
      : quoteAmount.div(10 ** 18).toString();

    const estimatedHoneyValue = tokenHoneyPrices
      ? Number(tokenHoneyPrices[getAddress(pool.base)] ?? 0) *
          Number(formattedBaseAmount) +
        Number(tokenHoneyPrices[getAddress(pool.quote)] ?? 0) *
          Number(formattedQuoteAmount)
      : 0;

    const userPosition: IUserPosition = {
      baseAmount,
      quoteAmount,
      formattedBaseAmount,
      formattedQuoteAmount,
      estimatedHoneyValue,
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
