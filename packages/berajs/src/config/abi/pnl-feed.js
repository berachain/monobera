export const PNL_FEED_ABI = [
	{
		inputs: [
			{
				internalType: "contract IGToken",
				name: "_gToken",
				type: "address",
			},
			{
				internalType: "bytes32",
				name: "_job",
				type: "bytes32",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bytes32",
				name: "newValue",
				type: "bytes32",
			},
		],
		name: "JobUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "newEpoch",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "requestId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "int256[]",
				name: "epochMedianValues",
				type: "int256[]",
			},
			{
				indexed: false,
				internalType: "int256",
				name: "epochAverageValue",
				type: "int256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newEpochPositiveOpenPnl",
				type: "uint256",
			},
		],
		name: "NewEpoch",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "newEpoch",
				type: "uint256",
			},
		],
		name: "NewEpochForced",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "currEpoch",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "requestId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "bytes32",
				name: "job",
				type: "bytes32",
			},
		],
		name: "NextEpochValueRequested",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "currEpoch",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "requestsResetCount",
				type: "uint256",
			},
		],
		name: "NextEpochValuesReset",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newValue",
				type: "uint256",
			},
		],
		name: "NumberParamUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "currEpoch",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "requestId",
				type: "uint256",
			},
		],
		name: "RequestMedianValueSet",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bool",
				name: "isLate",
				type: "bool",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "currEpoch",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "requestId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "int256",
				name: "requestValue",
				type: "int256",
			},
		],
		name: "RequestValueReceived",
		type: "event",
	},
	{
		inputs: [],
		name: "forceNewEpoch",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "reqId",
				type: "uint256",
			},
			{
				internalType: "int256",
				name: "value",
				type: "int256",
			},
		],
		name: "fulfill",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "gToken",
		outputs: [
			{
				internalType: "contract IGToken",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "job",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "lastRequestId",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "newOpenPnlRequestOrEpoch",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "nextEpochValues",
		outputs: [
			{
				internalType: "int256",
				name: "",
				type: "int256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "nextEpochValuesLastRequest",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "nextEpochValuesRequestCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "requestAnswers",
		outputs: [
			{
				internalType: "int256",
				name: "",
				type: "int256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "requests",
		outputs: [
			{
				internalType: "bool",
				name: "initiated",
				type: "bool",
			},
			{
				internalType: "bool",
				name: "active",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "requestsCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "requestsEvery",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "requestsStart",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "resetNextEpochValueRequests",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "newValue",
				type: "bytes32",
			},
		],
		name: "updateJob",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "newValue",
				type: "uint256",
			},
		],
		name: "updateRequestsCount",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "newValue",
				type: "uint256",
			},
		],
		name: "updateRequestsEvery",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "newRequestsStart",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "newRequestsEvery",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "newRequestsCount",
				type: "uint256",
			},
		],
		name: "updateRequestsInfoBatch",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "newValue",
				type: "uint256",
			},
		],
		name: "updateRequestsStart",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
