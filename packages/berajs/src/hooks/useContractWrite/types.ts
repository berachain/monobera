export interface IContractWrite {
  address: `0x${string}`;
  abi: any[];
  functionName: string;
  params: any[];
  txnName?: string;
}

export interface useContractWriteApi {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  write: (props: IContractWrite) => void;
}

export interface IUseContractWrite {
  onSuccess?: (hash: string) => void;
  onError?: (e?: Error) => void;
  onLoading?: () => void;
  onSubmission?: () => void;
}
