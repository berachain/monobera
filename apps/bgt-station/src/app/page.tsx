import { type Metadata } from "next";
import { type CuttingBoard } from "@bera/berajs";

import { indexerUrl } from "~/config";
import DashBoard from "./dashboard/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | BGT Station | Berachain",
  description: "BGT Station",
};

export default function Page() {
  return <DashBoard />;
}
