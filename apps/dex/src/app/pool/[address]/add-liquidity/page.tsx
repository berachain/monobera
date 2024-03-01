import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getMetaTitle } from "~/utils/metadata";
import { getAbsoluteUrl } from "~/utils/vercel-utils";
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
      {
        method: "GET",
        headers: {
          "x-vercel-protection-bypass": process.env
            .VERCEL_AUTOMATION_BYPASS_SECRET as string,
        },
      },
    );

    const pool = await poolResponse.json();

    if (pool.error !== undefined) {
      notFound();
    }

    return <AddLiquidityContent pool={pool} />;
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
