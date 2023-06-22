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

export default function PoolPage({ params }: { params: { address: string } }) {
  return <PoolPageContent params={params} />;
}
