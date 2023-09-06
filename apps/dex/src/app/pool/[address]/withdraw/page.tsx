import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { RouterService, defaultConfig } from "@bera/bera-router";
import { type CuttingBoard } from "@bera/berajs";

import { getMetaTitle } from "~/utils/metadata";
import { getWBeraPriceDictForPoolTokens } from "../../api/getPrice";
import WithdrawPageContent from "./WithdrawPageContent";

type Props = {
  params: { address: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { address } = params;
  return {
    title: getMetaTitle("Withdraw Liquidity"),
    description: `Withdraw liquidity from pool ${address}`,
  };
}

async function getGlobalCuttingBoard() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_INDEXER_ENDPOINT}/bgt/rewards`,
    );
    const jsonRes = await res.json();
    return jsonRes.result;
  } catch (e) {
    console.log(e);
  }
}

export default async function Withdraw({
  params,
}: {
  params: { address: string };
}) {
  const router = new RouterService(defaultConfig);
  const globalCuttingBoard = getGlobalCuttingBoard();
  try {
    const fetchPools = router.fetchPools();
    const data: any = await Promise.all([fetchPools, globalCuttingBoard]).then(
      ([fetchPools, globalCuttingBoard]) => ({
        fetchPools: fetchPools,
        globalCuttingBoard: globalCuttingBoard,
      }),
    );
    const pool = router.getPool(params.address);
    const prices = await getWBeraPriceDictForPoolTokens(
      pool ? [pool] : [],
      data?.globalCuttingBoard as CuttingBoard[],
      router,
    );
    return <WithdrawPageContent pool={pool} prices={prices} />;
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
