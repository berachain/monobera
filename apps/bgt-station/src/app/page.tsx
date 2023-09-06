import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import DashBoard from "./dashboard/dashboard";

export const metadata: Metadata = {
  title: getMetaTitle("BGT Station"),
  description: `Welcome to ${process.env.NEXT_PUBLIC_BGT_NAME}!`,
};

export default function Page() {
  return <DashBoard />;
}
