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
      `${process.env.NEXT_PUBLIC_INDEXER_ENDPOINT}/bgt/rewards`,
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
