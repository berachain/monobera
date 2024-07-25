import { type Metadata } from "next";
import { bgtName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";

import DashBoard from "./components/dashboard";

export const metadata: Metadata = {
  title: getMetaTitle("Dashboard", bgtName),
  description: "View global BGT statistics",
};

export default function Page() {
  return <DashBoard />;
}
