import {
  Abi,
  AbiStateMutability,
  ContractFunctionArgs,
  ContractFunctionName,
  ExtractAbiItem,
} from "viem";
import { BeraConfig } from "~/types";

export interface IContractWrite<
  TAbi extends Abi = Abi,
  TFunctionName extends ContractFunctionName<TAbi> = ContractFunctionName<TAbi>,
> {
  address: `0x${string}`;
  abi: TAbi;
  functionName: TFunctionName;
  params: ContractFunctionArgs<TAbi, AbiStateMutability, TFunctionName>;
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
