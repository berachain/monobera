import { type Metadata } from "next";

import { getMetaTitle } from "@bera/shared-ui";
import { Rewards } from "./rewards";
import { dexName } from "@bera/config";

export const metadata: Metadata = {
  title: getMetaTitle("Rewards", dexName),
  description: "View & claim your BGT rewards",
};

export default function Page() {
  return <Rewards />;
}
