import { type Metadata } from "next";
import { notFound } from "next/navigation";
// import { Rewards } from "./rewards";
import { dexName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";

export const metadata: Metadata = {
  title: getMetaTitle("Rewards", dexName),
  description: "View & claim your BGT rewards",
};

export default function Page() {
  // return <Rewards />;
  notFound();
}
