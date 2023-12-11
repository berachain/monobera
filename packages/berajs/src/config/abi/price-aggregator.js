export const PRICE_AGGREGATOR_ABI = [
	{
		inputs: [
			{
				internalType: "contract StorageInterfaceV5",
				name: "_storageT",
				type: "address",
			},
			{
				internalType: "contract PairsStorageInterfaceV6",
				name: "_pairsStorage",
				type: "address",
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
				internalType: "address",
				name: "value",
				type: "address",
			},
		],
		name: "PairsStorageUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "orderId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "node",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "pairIndex",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "referencePrice",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "linkFee",
				type: "uint256",
			},
		],
		name: "PriceReceived",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "orderId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "job",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "pairIndex",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "enum GNSPriceAggregatorV6_3.OrderType",
				name: "orderType",
				type: "uint8",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "nodesCount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "linkFeePerNode",
				type: "uint256",
			},
		],
		name: "PriceRequested",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "orderId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
		],
		name: "fulfill",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "pairIndex",
				type: "uint256",
			},
			{
				internalType: "enum GNSPriceAggregatorV6_3.OrderType",
				name: "orderType",
				type: "uint8",
			},
			{
				internalType: "uint256",
				name: "leveragedPosDai",
				type: "uint256",
			},
		],
		name: "getPrice",
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
	{
		inputs: [
			{
				internalType: "uint256",
				name: "pairIndex",
				type: "uint256",
			},
		],
		name: "openFeeP",
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
		],
		name: "orders",
		outputs: [
			{
				internalType: "uint256",
				name: "pairIndex",
				type: "uint256",
			},
			{
				internalType: "enum GNSPriceAggregatorV6_3.OrderType",
				name: "orderType",
				type: "uint8",
			},
			{
				internalType: "uint256",
				name: "linkFeePerNode",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "initiated",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "pairsStorage",
		outputs: [
			{
				internalType: "contract PairsStorageInterfaceV6",
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
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "pendingSlOrders",
		outputs: [
			{
				internalType: "address",
				name: "trader",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "pairIndex",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "openPrice",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "buy",
				type: "bool",
			},
			{
				internalType: "uint256",
				name: "newSl",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "storageT",
		outputs: [
			{
				internalType: "contract StorageInterfaceV5",
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
				internalType: "uint256",
				name: "orderId",
				type: "uint256",
			},
			{
				components: [
					{
						internalType: "address",
						name: "trader",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "pairIndex",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "index",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "openPrice",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "buy",
						type: "bool",
					},
					{
						internalType: "uint256",
						name: "newSl",
						type: "uint256",
					},
				],
				internalType: "struct GNSPriceAggregatorV6_3.PendingSl",
				name: "p",
				type: "tuple",
			},
		],
		name: "storePendingSlOrder",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "tokenPriceDai",
		outputs: [
			{
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
		],
		stateMutability: "pure",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "orderId",
				type: "uint256",
			},
		],
		name: "unregisterPendingSlOrder",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "contract PairsStorageInterfaceV6",
				name: "value",
				type: "address",
			},
		],
		name: "updatePairsStorage",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
