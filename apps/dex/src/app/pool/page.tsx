import { type Metadata } from "next";
import { RouterService, defaultConfig } from "@bera/bera-router";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { formatUnits, parseUnits } from "viem";

import PoolsTable from "~/components/pools-table";
import PoolPageHeader from "./PoolPageHeader";

export const metadata: Metadata = {
  title: "Pools | DEX | Berachain",
  description: "Decentralized exchange on Berachain",
};

const BERA = "0x1d36145c30807f07C86312dC4f94527A25022546";
export const revalidate = 300; // five minutes
export default async function Pool() {
  const router = new RouterService(defaultConfig);
  await router.fetchPools();
  const pools = router.getPools();
  // TODO typesafe this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allPoolPromises: any[] = [];
  pools.forEach((pool) => {
    const tokenPromises = pool.tokens
      .filter((token) => token.address !== BERA)
      .map((token) =>
        router
          .getSwaps(token.address, BERA, 0, parseUnits(`${1}`, token.decimals))
          .catch(() => {
            return {
              tokenIn: token.address,
            };
          }),
      );

    allPoolPromises.push(tokenPromises);
  });

  const allPoolData = await Promise.all(allPoolPromises.flat());

  const mappedTokens =
    allPoolData?.length &&
    allPoolData.reduce(
      (acc, cur) => {
        acc[cur.tokenIn] = cur.formattedReturnAmount;
        return acc;
      },
      { [BERA]: "1" },
    );

  pools.map(async (pool) => {
    const swapsResponse = await fetch(
      `http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com/pool/historical_volumes/${pool.pool}`,
    );
    const swaps = await swapsResponse.json();

    if (swaps.length === 0) {
      pool.volumeForTheDay = 0;
    }
    console.log("volumes", swaps.result);
    pool.totalValue = pool.tokens.reduce((acc, cur) => {
      const tokenValue = mappedTokens[cur.address];
      const tokenBalance = formatUnits(cur.balance, cur.decimals);
      const totalTokenValue = tokenValue * Number(tokenBalance);
      return acc + totalTokenValue;
    }, 0);
  });

  return (
    <div className="container m-auto flex w-full flex-col gap-5">
      <PoolPageHeader />
      <PoolsTable pools={pools} mappedTokens={mappedTokens} />
    </div>
  );
}
