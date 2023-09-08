import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import { indexerUrl } from "~/config";
import DashBoard from "./dashboard";

export const metadata: Metadata = {
  title: getMetaTitle("Dashboard"),
  description: `View global BGT statistics`,
};

async function getAvgValidatorUptime() {
  try {
    const res = await fetch(`${indexerUrl}/validators/uptime`);
    const jsonRes = await res.json();
    return jsonRes;
  } catch (e) {
    console.log(e);
  }
}

export default async function Page() {
  const avgValidatorUptime = await getAvgValidatorUptime();
  return <DashBoard avgValidatorUptime={avgValidatorUptime} />;
}
