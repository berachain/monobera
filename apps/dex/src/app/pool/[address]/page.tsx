/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { type Metadata } from "next";

import PoolPageContent from "./PoolPageContent";

type Props = {
  params: { address: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { address } = params;
  return {
    title: `${address} Pool | DEX | Berachain`,
  };
}

async function getData(address: string) {
  const resSwaps: any = await fetch(
    `http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com/events/dex/swap?pool=${address}&page=0&per_page=100`,
  );
  const resAdds: any = await fetch(
    `http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com/events/dex/add_liquidity?pool=${address}&page=0&per_page=100`,
  );
  const resRemove: any = await fetch(
    `http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com/events/dex/remove_liquidity?pool=${address}&page=0&per_page=100`,
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!resSwaps.ok || !resAdds.ok || !resRemove.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return [...resSwaps.json(), ...resAdds.json(), ...resRemove.json()];
}

export default async function PoolPage({
  params,
}: {
  params: { address: string };
}) {
  const events = await getData(params.address);

  return <PoolPageContent params={params} events={events} />;
}
