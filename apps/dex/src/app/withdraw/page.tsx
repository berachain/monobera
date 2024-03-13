import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { dexName } from "@bera/config";
import { isAddress } from "viem";

import { getMetaTitle } from "~/utils/metadata";
import { fetchSelectedPool } from "../pools/fetchPools";
import WithdrawPageContent from "./WithdrawPageContent";

export function generateMetadata(): Metadata {
  return {
    title: getMetaTitle("Withdraw Liquidity"),
    description: `Withdraw your liquidity from ${dexName}`,
  };
}

export const fetchCache = "force-no-store";

export default async function Withdraw({
  searchParams,
}: {
  searchParams: { shareAddress: string };
}) {
  try {
    if (!isAddress(searchParams.shareAddress)) {
      notFound();
    }
    const pool = await fetchSelectedPool(searchParams.shareAddress);

    if (!pool) {
      notFound();
    }
    return <WithdrawPageContent pool={pool} />;
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
