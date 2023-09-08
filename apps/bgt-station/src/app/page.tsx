import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import { indexerUrl } from "~/config";
import DashBoard from "./dashboard/dashboard";

export const metadata: Metadata = {
  title: getMetaTitle("Home"),
  description: `Welcome to ${process.env.NEXT_PUBLIC_BGT_NAME}!`,
};

async function getAvgValidatorUptime() {
  try {
    const res = await fetch(`${indexerUrl}/validators/uptime`);
    const jsonRes = await res.json();
    // console.log(jsonRes);
    return jsonRes;
  } catch (e) {
    console.log(e);
  }
}

export default async function Page() {
  const avgValidatorUptime = await getAvgValidatorUptime();
  return <DashBoard avgValidatorUptime={avgValidatorUptime.uptime ?? 0} />;
}
