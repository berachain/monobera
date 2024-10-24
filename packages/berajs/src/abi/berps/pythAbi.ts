export const pythAbi = [
  {
    type: "function",
    name: "getEmaPrice",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "price",
        type: "tuple",
        internalType: "struct PythStructs.Price",
        components: [
          {
            name: "price",
            type: "int64",
            internalType: "int64",
          },
          {
            name: "conf",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "expo",
            type: "int32",
            internalType: "int32",
          },
          {
            name: "publishTime",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEmaPriceNoOlderThan",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "age",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "price",
        type: "tuple",
        internalType: "struct PythStructs.Price",
        components: [
          {
            name: "price",
            type: "int64",
            internalType: "int64",
          },
          {
            name: "conf",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "expo",
            type: "int32",
            internalType: "int32",
          },
          {
            name: "publishTime",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEmaPriceUnsafe",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "price",
        type: "tuple",
        internalType: "struct PythStructs.Price",
        components: [
          {
            name: "price",
            type: "int64",
            internalType: "int64",
          },
          {
            name: "conf",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "expo",
            type: "int32",
            internalType: "int32",
          },
          {
            name: "publishTime",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPrice",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "price",
        type: "tuple",
        internalType: "struct PythStructs.Price",
        components: [
          {
            name: "price",
            type: "int64",
            internalType: "int64",
          },
          {
            name: "conf",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "expo",
            type: "int32",
            internalType: "int32",
          },
          {
            name: "publishTime",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPriceNoOlderThan",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "age",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "price",
        type: "tuple",
        internalType: "struct PythStructs.Price",
        components: [
          {
            name: "price",
            type: "int64",
            internalType: "int64",
          },
          {
            name: "conf",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "expo",
            type: "int32",
            internalType: "int32",
          },
          {
            name: "publishTime",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPriceUnsafe",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "price",
        type: "tuple",
        internalType: "struct PythStructs.Price",
        components: [
          {
            name: "price",
            type: "int64",
            internalType: "int64",
          },
          {
            name: "conf",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "expo",
            type: "int32",
            internalType: "int32",
          },
          {
            name: "publishTime",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUpdateFee",
    inputs: [
      {
        name: "updateData",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    outputs: [
      {
        name: "feeAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getValidTimePeriod",
    inputs: [],
    outputs: [
      {
        name: "validTimePeriod",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "parsePriceFeedUpdates",
    inputs: [
      {
        name: "updateData",
        type: "bytes[]",
        internalType: "bytes[]",
      },
      {
        name: "priceIds",
        type: "bytes32[]",
        internalType: "bytes32[]",
      },
      {
        name: "minPublishTime",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "maxPublishTime",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [
      {
        name: "priceFeeds",
        type: "tuple[]",
        internalType: "struct PythStructs.PriceFeed[]",
        components: [
          {
            name: "id",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "price",
            type: "tuple",
            internalType: "struct PythStructs.Price",
            components: [
              {
                name: "price",
                type: "int64",
                internalType: "int64",
              },
              {
                name: "conf",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "expo",
                type: "int32",
                internalType: "int32",
              },
              {
                name: "publishTime",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "emaPrice",
            type: "tuple",
            internalType: "struct PythStructs.Price",
            components: [
              {
                name: "price",
                type: "int64",
                internalType: "int64",
              },
              {
                name: "conf",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "expo",
                type: "int32",
                internalType: "int32",
              },
              {
                name: "publishTime",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "parsePriceFeedUpdatesUnique",
    inputs: [
      {
        name: "updateData",
        type: "bytes[]",
        internalType: "bytes[]",
      },
      {
        name: "priceIds",
        type: "bytes32[]",
        internalType: "bytes32[]",
      },
      {
        name: "minPublishTime",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "maxPublishTime",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [
      {
        name: "priceFeeds",
        type: "tuple[]",
        internalType: "struct PythStructs.PriceFeed[]",
        components: [
          {
            name: "id",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "price",
            type: "tuple",
            internalType: "struct PythStructs.Price",
            components: [
              {
                name: "price",
                type: "int64",
                internalType: "int64",
              },
              {
                name: "conf",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "expo",
                type: "int32",
                internalType: "int32",
              },
              {
                name: "publishTime",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "emaPrice",
            type: "tuple",
            internalType: "struct PythStructs.Price",
            components: [
              {
                name: "price",
                type: "int64",
                internalType: "int64",
              },
              {
                name: "conf",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "expo",
                type: "int32",
                internalType: "int32",
              },
              {
                name: "publishTime",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "updatePriceFeeds",
    inputs: [
      {
        name: "updateData",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "updatePriceFeedsIfNecessary",
    inputs: [
      {
        name: "updateData",
        type: "bytes[]",
        internalType: "bytes[]",
      },
      {
        name: "priceIds",
        type: "bytes32[]",
        internalType: "bytes32[]",
      },
      {
        name: "publishTimes",
        type: "uint64[]",
        internalType: "uint64[]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    name: "BatchPriceFeedUpdate",
    inputs: [
      {
        name: "chainId",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
      {
        name: "sequenceNumber",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PriceFeedUpdate",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "publishTime",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "price",
        type: "int64",
        indexed: false,
        internalType: "int64",
      },
      {
        name: "conf",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
] as const;
