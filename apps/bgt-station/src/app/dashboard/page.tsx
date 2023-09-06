import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import DashBoard from "./dashboard";

export const metadata: Metadata = {
  title: getMetaTitle("Dashboard"),
  description: `View global BGT statistics`,
};
export default function Page() {
  return <DashBoard />;
}
