import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPoolByAddress } from "@bera/berajs/src/utils/pools";
import { dexName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import { isAddress } from "viem";

import WithdrawPageContent from "../WithdrawPageContent";

export function generateMetadata(): Metadata {
  return {
    title: getMetaTitle("Withdraw Liquidity", dexName),
    description: `Withdraw your liquidity from ${dexName}`,
  };
}

export const fetchCache = "force-no-store";

export default async function Withdraw({
  params,
}: {
  params: { shareAddress: string };
}) {
  try {
    if (!isAddress(params.shareAddress)) {
      notFound();
    }
    const pool = await fetchPoolByAddress(params.shareAddress);

    if (!pool) {
      notFound();
    }
    return <WithdrawPageContent pool={pool} />;
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
