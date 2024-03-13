import cloneDeep from "lodash";
import {
  formatUnits,
  getAddress,
  parseUnits,
  type Address,
  type Chain,
  type SimulateContractReturnType,
} from "viem";

import { type RouterConfig } from "~/config";
import { PoolService } from "../PoolService/poolService";
import { DEX_PRECOMPILE_ABI, DEX_PRECOMPILE_ADDRESS } from "../constants";
import { RouteNotFound } from "./errors";
import { RouteProposer } from "./routeProposal";
import {
  SwapTypes,
  type BatchSwapStep,
  type NewPath,
  type ResultPath,
  type Swap,
  type SwapInfo,
  type SwapOptions,
  type SwapV2,
} from "./types";
import { getWrappedInfo, setWrappedInfo } from "./wrappers";

export const EMPTY_SWAPINFO: SwapInfo = {
  swaps: [],
  tokenIn: "" as Address,
  tokenOut: "" as Address,
  swapAmount: 0n,
  returnAmount: 0n,
  batchSwapSteps: [],
  tokenInObj: undefined,
  tokenOutObj: undefined,
  formattedSwapAmount: "",
  formattedReturnAmount: "",
  pools: [],
};

export class RouterService {
  private routeProposer: RouteProposer;
  public poolService: PoolService;
  private readonly defaultSwapOptions: SwapOptions = {
    gasPrice: parseUnits(`${85000}`, 9),
    swapGas: parseUnits(`${85000}`, 18),
    maxPools: 4,
    timestamp: Math.floor(Date.now() / 1000),
  };

  constructor(private readonly config: RouterConfig) {
    this.routeProposer = new RouteProposer(config);
    this.poolService = new PoolService(config);
  }
}