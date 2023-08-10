import { type Metadata } from "next";
import { RouterService, defaultConfig } from "@bera/bera-router";

import WithdrawPageContent from "./WithdrawPageContent";

type Props = {
  params: { address: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { address } = params;
  return {
    title: `Withdraw from ${address} Pool | DEX | Berachain`,
  };
}

export default async function Withdraw({
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

  return <WithdrawPageContent pool={pool} prices={{}} />;
}
