export interface TallyResult {
	abstainCount: string;
	noCount: string;
	noWithVetoCount: string;
	yesCount: string;
}

export interface TotalDeposit {
	amount: bigint;
	denom: string;
}

export interface Proposer {
	proposer: string;
}

export interface Proposal {
	id: bigint;
	title: string;
	status: number;
	proposalType: number; // You didn't provide this field, so you might need to adjust the type accordingly
	proposalContent: string; // You didn't provide this field, so you might need to adjust the type accordingly
	proposalResult: TallyResult;
	proposer: string;
	totalDeposit: TotalDeposit[];
	submitTime: bigint;
	depositEndTime: bigint;
	votingStartTime: bigint;
	messages: {
		typeURL: string;
		value: any;
	}[];
	votingEndTime: bigint;
	finalTallyResult: TallyResult;
	metadata: string;
	message: string;
	summary: string;
}

type Deposit = {
	denom: string;
	amount: string;
};

type VotingParams = {
	voting_period: string;
};

type DepositParams = {
	min_deposit: Deposit[];
	max_deposit_period: string;
};

type TallyParams = {
	quorum: string;
	threshold: string;
	veto_threshold: string;
};

export type DepositParamsResponse = {
	voting_params: VotingParams;
	deposit_params: DepositParams;
	tally_params: TallyParams;
};
