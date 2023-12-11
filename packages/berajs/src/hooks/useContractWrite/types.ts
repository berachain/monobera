export interface IContractWrite {
	address: `0x${string}`;
	abi: any[];
	functionName: string;
	params: any[];
	txnName?: string;
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
	write: (props: IContractWrite) => void;
}

export interface useTxnSendWriteApi {
	isLoading: boolean;
	isSubmitting: boolean;
	isSuccess: boolean;
	isError: boolean;
	write: (props: IValueSend) => void;
}

export interface IUseContractWrite {
	onSuccess?: (hash: string) => void;
	onError?: (e?: Error) => void;
	onLoading?: () => void;
	onSubmission?: (hash: string) => void;
}
