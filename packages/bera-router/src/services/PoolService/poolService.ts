import { ApolloClient, InMemoryCache } from "@apollo/client";
import { subgraphUrl } from "@bera/config";
import { getAllPools } from "@bera/graphql";

import { type RouterConfig } from "~/config";
import { MultiCallPools } from "./onChainData";
import {
  type Pool,
  type PoolRecords,
  type RawPool,
  type SubGraphPool,
} from "./types";

export class PoolService {
  private pools: RawPool[] = [];
  public finishedFetching = false;
  private poolMulticall: MultiCallPools;
  public finalPools: Pool[] = [];
  constructor(private readonly config: RouterConfig) {
    this.poolMulticall = new MultiCallPools(
      config.contracts.multicallAddress,
      config.publicClient,
    );
  }

  public getPools() {
    return this.finalPools;
  }

  public getPoolRecords(): PoolRecords {
    return this.poolMulticall.getPoolRecords();
  }

  public async fetchPools() {
    try {
      const client = new ApolloClient({
        uri: subgraphUrl,
        cache: new InMemoryCache(),
      });

      const subgraphPools: SubGraphPool[] = await client
        .query({
          query: getAllPools,
        })
        .then((res: any) => res.data.pools)
        .catch(() => undefined);

      this.finalPools = this.poolMulticall.formatSubGraphPools(subgraphPools);
      // const responsePromise = fetch(
      //   `${this.config.subgraphUrl}/events/dex/pool_created`,
      // );

      // const [response] = await Promise.all([responsePromise]);

      // const poolResponse = await response.json();
      // this.pools = poolResponse.result;
      // this.poolMulticall.getPoolData(this.pools);
      // await this.poolMulticall.execute(this.pools);

      // console.log(this.poolMulticall.getPools())
      this.finishedFetching = true;
      return true;
    } catch (err) {
      // On error clear all caches and return false so user knows to try again.
      this.finishedFetching = false;
      this.pools = [];
      console.error(`Error: fetchPools(): ${err}`);
      return false;
    }
  }

  public async fetchPaginatedPools(page: number, perPage: number) {
    try {
      const response = await fetch(
        `${this.config.subgraphUrl}/events/dex/pool_created?page=${page}&per_page=${perPage}`,
      );
      const temp = await response.json();

      this.pools = temp.result;
      this.poolMulticall.getPoolData(this.pools);
      await this.poolMulticall.execute(this.pools);

      this.finishedFetching = true;

      return this.poolMulticall.getPools();
    } catch (err) {
      // On error clear all caches and return false so user knows to try again.
      this.finishedFetching = false;
      this.pools = [];
      console.error(`Error: fetchPools(): ${err}`);
      return undefined;
    }
  }
}
