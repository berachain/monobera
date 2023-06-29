import { DEX_PRECOMPILE_ABI, DEX_PRECOMPILE_ADDRESS } from "@bera/berajs";
import { set } from "lodash";
import { type Address, type PublicClient } from "viem";

import { type RouterConfig } from "~/config";

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

interface Weight {
  asset: string;
  weight: bigint;
  totalDeposited: number;
}
interface RawPoolData {
  totalSupply: bigint;
  poolName: string;
  swapFee: bigint;
  weights: any[];
}

const rawPools = {} as Record<string, RawPoolData>;

export class MultiCallPools {
  private multiAddress: string;
  private provider: PublicClient;
  public options = {};
  private calls: [string, any[], string, unknown[] | undefined][] = [];
  private paths: string[] = [];

  constructor(
    multiAddress: string,
    provider: PublicClient,
    abi: any[],
    options = {},
  ) {
    this.multiAddress = multiAddress;
    this.provider = provider;
    this.options = options;
  }
  call(
    path: string,
    abi: any[],
    address: string,
    functionName: string,
    params?: unknown[],
  ): MultiCallPools {
    this.calls.push([address, abi, functionName, params]);
    this.paths.push(path);
    return this;
  }

  // build calls
  // execute, recieve key value pairs
  // compile keys SubgraphPoolBase[]
  public getPoolData = (pools: Address[], config: RouterConfig): any => {
    pools.forEach((pool) => {
      // this needs share address
      this.call(
        `${pool}.totalSupply`,
        [
          {
            constant: true,
            inputs: [],
            name: "totalSupply",
            outputs: [
              {
                name: "",
                type: "uint256",
              },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
          },
        ],
        pool,
        "totalSupply",
      );
      this.call(
        `${pool}.poolName`,
        DEX_PRECOMPILE_ABI,
        DEX_PRECOMPILE_ADDRESS,
        "getPoolName",
      );
      this.call(
        `${pool}.getPoolOptions`,
        DEX_PRECOMPILE_ABI,
        DEX_PRECOMPILE_ADDRESS,
        "getPoolOptions",
      ); // weights
      this.call(
        `${pool}.getLiquidity`,
        DEX_PRECOMPILE_ABI,
        DEX_PRECOMPILE_ADDRESS,
        "getLiquidity",
      ); // liquidity
      this.call(
        `${pool}.getTotalShares`,
        DEX_PRECOMPILE_ABI,
        DEX_PRECOMPILE_ADDRESS,
        "getTotalShares",
      ); // pool shares
    });
  };

  async execute() {
    const rawObj: Record<string, unknown> = {};

    const results: any[] = await this.provider.multicall({
      contracts: this.calls.map((call) => {
        return {
          address: call[0] as Address,
          abi: call[1],
          functionName: call[2],
          args: call[3] as any[],
        };
      }),
      multicallAddress: this.multiAddress as Address,
    });

    results.forEach((result, i) =>
      set(rawObj, this.paths[i] ?? "", result.result),
    );

    // take rawObj and compile into record of parsed pool data
  }
}
