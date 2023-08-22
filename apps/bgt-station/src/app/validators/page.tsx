import React from "react";
import { type Metadata } from "next";

import Validators from "./validators";

export const metadata: Metadata = {
  title: "Validators | Berachain",
  description: "BGT Station",
};

async function getGlobalCuttingBoard() {
  try {
    const res = await fetch(
      `http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com/bgt/rewards`,
    );
    const jsonRes = await res.json();
    return jsonRes.result;
  } catch (e) {
    console.log(e);
  }
}

export default async function Page() {
  const cuttingBoard = getGlobalCuttingBoard();
  const data: any = await Promise.all([cuttingBoard]).then(
    ([cuttingBoard]) => ({
      cuttingBoard: cuttingBoard,
    }),
  );

  return <Validators activeGauges={data.cuttingBoard?.length ?? 0} />;
}
