import { type Metadata } from "next";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";

import { getMetaTitle } from "~/utils/metadata";
import PoolPageHeader from "./PoolPageHeader";

export const metadata: Metadata = {
  title: getMetaTitle("Pools"),
  description: "View pools",
};

export default function Pool() {
  // const router = new RouterService(defaultConfig);
  // let pools: Pool[] | undefined = undefined;
  // try {
  //   pools = await router.fetchPaginatedPools(1, 1);
  //   await getWBeraPriceDictForPoolTokens(pools ?? [], router);
  // } catch (e) {
  //   console.log(`Error fetching pools: ${e}`);
  // }
  // await getWBeraPriceDictForPoolTokens(pools, router);

  return (
    <div className="container m-auto flex w-full flex-col gap-5">
      <PoolPageHeader />
      {/* <PoolsTable pools={sortedPools ?? []} /> */}
    </div>
  );
}
