import { type Metadata } from "next";
import { getMetaTitle } from "@bera/shared-ui";
import PoolPageHeader from "./PoolPageHeader";
import { dexName } from "@bera/config";

export const metadata: Metadata = {
  title: getMetaTitle("Pools", dexName),
  description: "View pools",
};

export default function Pool({
  searchParams,
}: {
  searchParams: {
    pool: "allPools" | "userPools";
  };
}) {
  return (
    <div className="flex w-full flex-col gap-5">
      <PoolPageHeader
        poolType={searchParams.pool !== "userPools" ? "allPools" : "userPools"}
      />
    </div>
  );
}
