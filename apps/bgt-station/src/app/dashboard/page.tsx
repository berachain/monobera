import { type Metadata } from "next";

import { getMetaTitle } from "@bera/shared-ui";
import DashBoard from "./dashboard";
import { bgtName } from "@bera/config";

export const metadata: Metadata = {
  title: getMetaTitle("Dashboard", bgtName),
  description: "View global BGT statistics",
};

export default function Page() {
  return <DashBoard />;
}
