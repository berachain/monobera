import { type Metadata } from "next";

import Page from "./dashboard/page";

export const metadata: Metadata = {
  title: "DashBoard | Berachain",
  description: "BGT Station",
};

export default function Home() {
  return <Page />;
}
