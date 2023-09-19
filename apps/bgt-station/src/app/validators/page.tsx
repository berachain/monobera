import React from "react";
import { type Metadata } from "next";
import { indexerUrl } from "@bera/config";

import { getMetaTitle } from "~/utils/metadata";
import Validators from "./validators";

export const metadata: Metadata = {
  title: getMetaTitle("Validators"),
  description: `View active validators on Berachain`,
};

async function getBGTSupply() {
  try {
    const res = await fetch(`${indexerUrl}/bgt/supply?num_of_days=1`);
    const jsonRes = await res.json();
    // console.log(jsonRes);
    return jsonRes;
  } catch (e) {
    console.log(e);
  }
}

async function getUniqueGauges() {
  try {
    const res = await fetch(`${indexerUrl}/cuttingboards/unique`);
    const jsonRes = await res.json();
    return jsonRes.count;
  } catch (e) {
    console.log(e);
  }
}

export default async function Page() {
  const uniqueGauges = getUniqueGauges();
  const bgtSupply = getBGTSupply();
  const data: any = await Promise.all([uniqueGauges, bgtSupply]).then(
    ([uniqueGauges, bgtSupply]) => ({
      uniqueGauges: uniqueGauges,
      bgtSupply: bgtSupply,
    }),
  );

  return (
    <Validators
      activeGauges={data.uniqueGauges ?? 0}
      oldBgtSupply={data.supply ?? undefined}
    />
  );
}
