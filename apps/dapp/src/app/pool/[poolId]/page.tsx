import React from "react";

export default function PoolPage({ params }: { params: { poolId: string } }) {
  return <div>{params.poolId}</div>;
}
