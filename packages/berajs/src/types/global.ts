import { SWRConfiguration, SWRResponse } from "swr";
import { Address } from "viem";

export interface BeraConfig {
  endpoints?: {
    dexRouter?: string;
    tokenList?: string;
  };
  subgraphs?: {
    honeySubgraph?: string;
    dexSubgraph?: string;
    lendSubgraph?: string;
  };
  contracts?: {
    multicallAddress?: Address;
    crocMultiSwapAddress?: Address;
    wrappedTokenAddress?: Address;
    dexAddress?: Address;
    honeyAddress?: Address;
  };
}

export type DefaultHookProps<
  ArgsType = any,
  ArgsFieldOptional = true,
> = ArgsType extends never
  ? { config: BeraConfig; opts?: SWRConfiguration | undefined }
  : ArgsFieldOptional extends true
    ? {
        args?: ArgsType;
        config: BeraConfig;
        opts?: SWRConfiguration | undefined;
      }
    : {
        args: ArgsType;
        config: BeraConfig;
        opts?: SWRConfiguration | undefined;
      };

export type DefaultHookReturnType<T = any> = SWRResponse<T, any, any>;

export interface PayloadReturnType<T = any[]> {
  payload: T;
  value?: bigint;
}
