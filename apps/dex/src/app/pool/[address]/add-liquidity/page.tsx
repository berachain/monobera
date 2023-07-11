import { type Metadata } from "next";

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

export default function AddLiquidity({
  params,
}: {
  params: { address: string };
}) {
  return <AddLiquidityContent params={params} />;
}
