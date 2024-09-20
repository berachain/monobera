import { Abi } from "viem";
import { BeraConfig } from "~/types";

export interface IContractWrite {
  address: `0x${string}`;
  abi: Abi | any[];
  functionName: string;
  params: any[];
  txnName?: string;
  gasLimit?: bigint;
  value?: bigint;
}

export interface IValueSend {
  address: `0x${string}`;
  txnName?: string;
  value?: any;
}

export interface useContractWriteApi {
  isLoading: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  write: (props: IContractWrite) => Promise<void>;
}

export interface useTxnSendWriteApi {
  isLoading: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  write: (props: IValueSend) => void;
}

export interface IUseContractWriteArgs {
  onSuccess?: (hash: string) => void;
  onError?: (e?: any) => void;
  onLoading?: () => void;
  onSubmission?: (hash: string) => void;
  config?: BeraConfig;
}
