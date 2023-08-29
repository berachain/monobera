import { type Metadata } from "next";
import { type CuttingBoard } from "@bera/berajs";

import { indexerUrl } from "~/config";
import DashBoard from "./dashboard";

export const metadata: Metadata = {
  title: "Dashboard | BGT Station | Berachain",
  description: "BGT Station",
};

async function getGlobalCuttingBoard() {
  try {
    const res = await fetch(`${indexerUrl}/bgt/rewards`);
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

  return (
    <DashBoard
      globalCuttingBoard={
        data.cuttingBoard.sort(
          (a: { percentage: string }, b: { percentage: string }) =>
            parseFloat(b.percentage) - parseFloat(a.percentage),
        ) as CuttingBoard[]
      }
    />
  );
}
