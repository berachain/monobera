import { type Metadata } from "next";
import { dexName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";

import PoolPageHeader from "./PoolPageHeader";

export const metadata: Metadata = {
  title: getMetaTitle("Pools", dexName),
  description: "View pools",
};

export default function Pool() {
  return (
    <div className="flex w-full flex-col gap-5">
      <PoolPageHeader />
    </div>
  );
}
