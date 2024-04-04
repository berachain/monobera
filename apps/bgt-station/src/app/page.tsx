import { type Metadata } from "next";
import { bgtName } from "@bera/config";
import { Footer } from "@bera/shared-ui";

import { getMetaTitle } from "@bera/shared-ui";
import DashBoard from "./dashboard/dashboard";

export const metadata: Metadata = {
  title: getMetaTitle("Home", bgtName),
  description: `Welcome to ${bgtName}!`,
};

export default function Page() {
  return (
    <>
      <div className="container max-w-1280 pb-16">
        <DashBoard />
      </div>
      <Footer />
    </>
  );
}
