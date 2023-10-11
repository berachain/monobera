import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getMetaTitle } from "~/utils/metadata";
import { getAbsoluteUrl } from "~/utils/vercel-utils";
import { type MappedTokens } from "../types";
import AddLiquidityContent from "./AddLiquidityContent";

type Props = {
  params: { address: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { address } = params;
  return {
    title: getMetaTitle("Add Liquidity"),
    description: `Add liquidity from pool ${address}`,
  };
}

export const fetchCache = "force-no-store";

export default async function AddLiquidity({
  params,
}: {
  params: { address: string };
}) {
  try {
    const poolResponse = await fetch(
      `${getAbsoluteUrl()}/api/getSelectedPool/api?address=${params.address}`,
    );
    const pricesResponse = await fetch(`${getAbsoluteUrl()}/api/getPrices/api`);

    const pool = await poolResponse.json();
    const prices = await pricesResponse.json();

    return (
      <AddLiquidityContent
        pool={pool}
        prices={prices as unknown as MappedTokens}
      />
    );
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
