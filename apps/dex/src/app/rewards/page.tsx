import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import { Rewards } from "./rewards";

export const metadata: Metadata = {
  title: getMetaTitle("Rewards"),
  description: "View & claim your BGT rewards",
};

export default function Page() {
  return <div> rewards</div>
  // <Rewards />;
}
