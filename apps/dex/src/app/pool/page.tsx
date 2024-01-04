import { type Metadata } from "next";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";

import { getMetaTitle } from "~/utils/metadata";
import PoolPageHeader from "./PoolPageHeader";

export const metadata: Metadata = {
  title: getMetaTitle("Pools"),
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
