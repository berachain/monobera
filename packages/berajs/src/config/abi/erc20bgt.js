export const ERC20BGT_PRECOMPILE_ABI = [
	{
		inputs: [],
		name: "bgtModule",
		outputs: [
			{
				internalType: "contract IBGTModule",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operatorAddr",
				type: "address",
			},
			{
				internalType: "int64",
				name: "startEpoch",
				type: "int64",
			},
			{
				internalType: "uint64",
				name: "numBlockProposals",
				type: "uint64",
			},
			{
				internalType: "address[]",
				name: "proposers",
				type: "address[]",
			},
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]",
			},
		],
		name: "createBribe",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "consAddr",
						type: "address",
					},
					{
						internalType: "int64",
						name: "startEpoch",
						type: "int64",
					},
					{
						internalType: "uint64",
						name: "numBlockProposals",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "remainingBlockProposals",
						type: "uint64",
					},
					{
						internalType: "address[]",
						name: "proposers",
						type: "address[]",
					},
					{
						internalType: "uint256[]",
						name: "amounts",
						type: "uint256[]",
					},
				],
				internalType: "struct ERC20BGTModule.Bribe",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "erc20Module",
		outputs: [
			{
				internalType: "contract IERC20Module",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "operatorAddr",
				type: "string",
			},
		],
		name: "getActiveBribesForValidator",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "consAddr",
						type: "address",
					},
					{
						internalType: "int64",
						name: "startEpoch",
						type: "int64",
					},
					{
						internalType: "uint64",
						name: "numBlockProposals",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "remainingBlockProposals",
						type: "uint64",
					},
					{
						internalType: "address[]",
						name: "proposers",
						type: "address[]",
					},
					{
						internalType: "uint256[]",
						name: "amounts",
						type: "uint256[]",
					},
				],
				internalType: "struct ERC20BGTModule.Bribe[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operatorAddr",
				type: "address",
			},
		],
		name: "getActiveBribesForValidator",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "consAddr",
						type: "address",
					},
					{
						internalType: "int64",
						name: "startEpoch",
						type: "int64",
					},
					{
						internalType: "uint64",
						name: "numBlockProposals",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "remainingBlockProposals",
						type: "uint64",
					},
					{
						internalType: "address[]",
						name: "proposers",
						type: "address[]",
					},
					{
						internalType: "uint256[]",
						name: "amounts",
						type: "uint256[]",
					},
				],
				internalType: "struct ERC20BGTModule.Bribe[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operatorAddr",
				type: "address",
			},
			{
				internalType: "int64",
				name: "startEpoch",
				type: "int64",
			},
		],
		name: "getBribeForValidator",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "consAddr",
						type: "address",
					},
					{
						internalType: "int64",
						name: "startEpoch",
						type: "int64",
					},
					{
						internalType: "uint64",
						name: "numBlockProposals",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "remainingBlockProposals",
						type: "uint64",
					},
					{
						internalType: "address[]",
						name: "proposers",
						type: "address[]",
					},
					{
						internalType: "uint256[]",
						name: "amounts",
						type: "uint256[]",
					},
				],
				internalType: "struct ERC20BGTModule.Bribe",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "operatorAddr",
				type: "string",
			},
			{
				internalType: "int64",
				name: "startEpoch",
				type: "int64",
			},
		],
		name: "getBribeForValidator",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "consAddr",
						type: "address",
					},
					{
						internalType: "int64",
						name: "startEpoch",
						type: "int64",
					},
					{
						internalType: "uint64",
						name: "numBlockProposals",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "remainingBlockProposals",
						type: "uint64",
					},
					{
						internalType: "address[]",
						name: "proposers",
						type: "address[]",
					},
					{
						internalType: "uint256[]",
						name: "amounts",
						type: "uint256[]",
					},
				],
				internalType: "struct ERC20BGTModule.Bribe",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "operatorAddr",
				type: "string",
			},
		],
		name: "getBribesForValidator",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "consAddr",
						type: "address",
					},
					{
						internalType: "int64",
						name: "startEpoch",
						type: "int64",
					},
					{
						internalType: "uint64",
						name: "numBlockProposals",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "remainingBlockProposals",
						type: "uint64",
					},
					{
						internalType: "address[]",
						name: "proposers",
						type: "address[]",
					},
					{
						internalType: "uint256[]",
						name: "amounts",
						type: "uint256[]",
					},
				],
				internalType: "struct ERC20BGTModule.Bribe[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operatorAddr",
				type: "address",
			},
		],
		name: "getBribesForValidator",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "consAddr",
						type: "address",
					},
					{
						internalType: "int64",
						name: "startEpoch",
						type: "int64",
					},
					{
						internalType: "uint64",
						name: "numBlockProposals",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "remainingBlockProposals",
						type: "uint64",
					},
					{
						internalType: "address[]",
						name: "proposers",
						type: "address[]",
					},
					{
						internalType: "uint256[]",
						name: "amounts",
						type: "uint256[]",
					},
				],
				internalType: "struct ERC20BGTModule.Bribe[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "accountAddress",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "redeemBgtForBera",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "payable",
		type: "function",
	},
];
