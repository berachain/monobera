import { type Address, type PublicClient } from "viem";
import { type RouterConfig } from "~/config";

export class PoolService {
  private pools: any[] = [];

  constructor(
    private readonly config: RouterConfig,
  ) {}

  public getPools() {}

  public async fetchPools() {}

  private async getSubgraphPools() {}

  private async getPoolInfo(pools: Address[]) {
    
  }
}
