import { type Metadata } from "next";
import { RouterService, defaultConfig } from "@bera/bera-router";

import { getWBeraPriceDictForPoolTokens } from "../../api/getPrice";
import { type MappedTokens } from "../types";
import AddLiquidityContent from "./AddLiquidityContent";

type Props = {
  params: { address: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { address } = params;
  return {
    title: `Add liquidity to ${address} Pool | DEX | Berachain`,
  };
}

export default async function AddLiquidity({
  params,
}: {
  params: { address: string };
}) {
  const router = new RouterService(defaultConfig);
  try {
    await router.fetchPools();
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
  }
  const pool = router.getPool(params.address);
  const prices = await getWBeraPriceDictForPoolTokens(
    pool ? [pool] : [],
    router,
  );

  return (
    <AddLiquidityContent
      pool={pool}
      prices={prices as unknown as MappedTokens}
    />
  );
}
