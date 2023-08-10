import { type Metadata } from "next";

import Data from "~/components/data";
import Graph from "~/components/graph";
import { HoneyMachine } from "~/components/honey-machine";
import HoneyTransactionsTable from "~/components/honey-transactions-table";
import { SwapCard } from "~/components/swap-card";

export const metadata: Metadata = {
  title: "Honey | Berachain",
  description: "Mo honey mo problems",
};

export default function Home() {
  return (
    <>
      <div className="honey:bg-[#468DCB]">
        <div className="m-auto hidden max-w-[1000px] honey:block">
          <HoneyMachine />
        </div>
        <div className="flex justify-center px-6 py-36 honey:hidden">
          <SwapCard />
        </div>
      </div>
      <div className="honey:bg-gradient-to-b honey:from-[#468DCB] honey:to-background">
        <div className="container">
          <Data />
          <Graph />
          <HoneyTransactionsTable />
        </div>
      </div>
    </>
  );
}
