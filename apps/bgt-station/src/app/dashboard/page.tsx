import { type Metadata } from "next";

import { Details } from "./components/Details";
import { bgtDetails } from "./constants";

export const metadata: Metadata = {
  title: "Dashboard | BGT Station | Berachain",
  description: "BGT Station",
};

export default function Dashboard() {
  return (
    <div className="container">
      <Details details={bgtDetails} />
    </div>
  );
}
