
import { type RouterConfig } from "~/config";
import { MultiCallPools } from "./onChainData";
import {
  type Pool,
  type RawPool,
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
}
