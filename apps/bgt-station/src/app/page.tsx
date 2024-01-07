import { type Metadata } from "next";
import { Footer } from "@bera/shared-ui";

import { getMetaTitle } from "~/utils/metadata";
import DashBoard from "./dashboard/dashboard";

export const metadata: Metadata = {
  title: getMetaTitle("Home"),
  description: `Welcome to ${process.env.NEXT_PUBLIC_BGT_NAME}!`,
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
