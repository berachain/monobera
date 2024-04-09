import { CrocPoolView, PriceRange } from "@bera/beracrocswap";
import { PayloadReturnType, WithdrawLiquidityRequest } from "~/types";
import { BigNumber } from "ethers";
import { CrocContext, connectCroc } from "@bera/beracrocswap/dist/context";
import { PublicClient } from "viem";
import { clientToProvider } from "~/hooks/useEthersProvider";
import { CrocTokenView } from "@bera/beracrocswap/dist/tokens";

export const getWithdrawLiquidityPayload = async ({
  args,
  publicClient,
}: {
  args: WithdrawLiquidityRequest;
  publicClient: PublicClient | undefined;
}): Promise<PayloadReturnType | undefined> => {
  const {
    slippage,
    poolPrice,
    baseToken,
    quoteToken,
    poolIdx,
    percentRemoval,
    seeds,
  } = args;
  try {
    if (!publicClient) {
      console.error("No public client");
      return undefined;
    }
    const provider = clientToProvider(publicClient);
    const crocContext: Promise<CrocContext> = connectCroc(provider);
    const baseCrocToken = new CrocTokenView(
      crocContext,
      baseToken.address,
      baseToken.decimals,
    );
    const quoteCrocToken = new CrocTokenView(
      crocContext,
      quoteToken.address,
      quoteToken.decimals,
    );
    const crocPool: CrocPoolView = new CrocPoolView(
      quoteCrocToken,
      baseCrocToken,
      crocContext,
    );
    const liquidityToBurn = BigNumber.from(seeds)?.mul(percentRemoval).div(100);
    const priceLimits = {
      min: poolPrice * (1 - (slippage ?? 1) / 100),
      max: poolPrice * (1 + (slippage ?? 1) / 100),
    };
    const limits: PriceRange = [priceLimits.min, priceLimits.max];
    let calldata = "";

    const response = await crocPool?.burnAmbientLiq(
      poolIdx,
      liquidityToBurn,
      limits,
    );
    calldata = response?.calldata ?? "";

    const payload = [2, calldata];

    return {
      payload,
    };
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
