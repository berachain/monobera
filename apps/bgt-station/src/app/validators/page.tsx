import React from "react";
import { type Metadata } from "next";
import {
  client,
  getGlobalCuttingBoard,
  getInflationData,
  type InflationRate,
  type Weight,
} from "@bera/graphql";

import { getMetaTitle } from "~/utils/metadata";
import Validators from "./validators";

export const metadata: Metadata = {
  title: getMetaTitle("Validators"),
  description: `View active validators on Berachain`,
};

async function getBGTSupply() {
  try {
    const inflationData: InflationRate | undefined = await client
      .query({
        query: getInflationData,
        variables: {
          page: 0,
          limit: 20,
        },
      })
      .then((res: any) => {
        const positiveInflationData = res.data.inflationRates.find(
          (inflationData: InflationRate) =>
            Number(inflationData.difference) > 0,
        );
        return positiveInflationData;
      })
      .catch((e) => {
        console.log(e);
        return undefined;
      });

    return inflationData === undefined
      ? 0
      : Number(inflationData.inflationRate);
  } catch (e) {
    console.log(e);
  }
}

async function getUniqueGauges() {
  try {
    const globalCuttingBoard: Weight[] = await client
      .query({
        query: getGlobalCuttingBoard,
        variables: {
          page: 0,
          limit: 1,
        },
      })
      .then((res: any) => {
        return res.data.globalCuttingBoardDatas[0].weights;
      })
      .catch((e) => {
        console.log(e);
        return undefined;
      });

    return globalCuttingBoard === undefined ? 0 : globalCuttingBoard.length;
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
      bgtSupply={data.bgtSupply ?? 0}
    />
  );
}
