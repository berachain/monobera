import { POLLING, useSlippage } from "@bera/shared-ui";
import useSWRImmutable from "swr/immutable";
import {
  AddLiquidityInput,
  AddLiquidityKind,
  AddLiquidity,
  Slippage,
  AddLiquidityBuildCallOutput,
} from "@balancer/sdk";
import { chainId, jsonRpcUrl } from "@bera/config";
import { Address } from "viem";
import { usePoolState } from "./usePoolState";

export interface ReferenceAmount {
  rawAmount: bigint;
  decimals: number;
  address: Address;
}

export interface ProportionalResponse {
  protocolVersion: 1 | 2 | 3;
  callData: string;
  to: Address;
  value: bigint;
  minBptOut: string;
  maxAmountsIn: string[];
}

export const useProportianalAddLiquidity = (
  poolId: string,
  referenceAmount: ReferenceAmount,
  wethIsEth: boolean,
) => {
  const { data: poolState } = usePoolState(poolId);
  const slippage = useSlippage();
  const QUERY_KEY = ["usePoolState", poolState, slippage];
  return useSWRImmutable<AddLiquidityBuildCallOutput | undefined>(
    QUERY_KEY,
    async () => {
      if (!poolState) {
        return undefined;
      }
      try {
        const addLiquidityInput: AddLiquidityInput = {
          referenceAmount,
          chainId,
          rpcUrl: jsonRpcUrl,
          kind: AddLiquidityKind.Proportional,
        };

        const addLiquidity = new AddLiquidity();
        const queryOutput = await addLiquidity.query(
          addLiquidityInput,
          poolState,
        );
        const baSlippage = Slippage.fromPercentage(slippage as any); // 1%

        const call = addLiquidity.buildCall({
          ...queryOutput,
          slippage: baSlippage,
          chainId,
          wethIsEth: false,
        });

        return call;
      } catch (e) {
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );
};
