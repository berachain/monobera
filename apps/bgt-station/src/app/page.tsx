import { type Metadata } from "next";

import DashBoard from "./dashboard/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | BGT Station | Berachain",
  description: "BGT Station",
};

export default function Page() {
  return <DashBoard />;
}
