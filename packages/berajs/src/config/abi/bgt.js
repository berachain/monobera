export const BGT_PRECOMPILE_ABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "bgtburner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "berareceiver",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint64",
				name: "redeemed",
				type: "uint64",
			},
		],
		name: "Redeem",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "receiver",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "redeem",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
];
