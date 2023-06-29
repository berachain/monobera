
import { type RouterConfig } from "~/config";
import { type SubgraphPoolBase } from "../RouterService/types";

export class PoolService {
  private pools: SubgraphPoolBase[] = [];
  public finishedFetching = false;
  constructor(private readonly config: RouterConfig) {}

  public getPools() {}

  public fetchPools() {}

}
