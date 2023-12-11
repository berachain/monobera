export const EPOCHS_PRECOMPILE_ABI = [
	{
		inputs: [
			{
				internalType: "string",
				name: "identifier",
				type: "string",
			},
		],
		name: "getCurrentEpoch",
		outputs: [
			{
				internalType: "int64",
				name: "epochNumber",
				type: "int64",
			},
			{
				internalType: "int64",
				name: "startTimestamp",
				type: "int64",
			},
			{
				internalType: "int64",
				name: "endTimestamp",
				type: "int64",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
