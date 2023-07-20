import axios from "axios";

import { type RouterConfig } from "~/config";
import { MultiCallPools } from "./onChainData";
import { type PoolRecords, type RawPool } from "./types";

export class PoolService {
  private pools: RawPool[] = [];
  public finishedFetching = false;
  private poolMulticall: MultiCallPools;
  constructor(private readonly config: RouterConfig) {
    this.poolMulticall = new MultiCallPools(
      config.contracts.multicallAddress,
      config.publicClient,
    );
  }

  public getPools() {
    return this.poolMulticall.getPools();
  }

  public getPoolRecords(): PoolRecords {
    return this.poolMulticall.getPoolRecords();
  }

  public async fetchPools() {
    try {
      const response = await axios.get(
        `${this.config.subgraphUrl}/events/dex/pool_created?page=1&per_page=10`,
      );
      this.pools = response.data.result;
      this.poolMulticall.getPoolData(this.pools);
      await this.poolMulticall.execute(this.pools);

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
}
