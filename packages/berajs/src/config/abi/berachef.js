export const BERACHEF_PRECOMPILE_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "operatorAddr",
        type: "string",
      },
    ],
    name: "getActiveCuttingBoard",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consAddr",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "receiverAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "percentageNumerator",
                type: "uint256",
              },
            ],
            internalType: "struct IBerachefModule.Weight[]",
            name: "weights",
            type: "tuple[]",
          },
          {
            internalType: "int64",
            name: "startEpoch",
            type: "int64",
          },
        ],
        internalType: "struct IBerachefModule.CuttingBoard",
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
        internalType: "address",
        name: "operatorAddr",
        type: "address",
      },
    ],
    name: "getActiveCuttingBoard",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consAddr",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "receiverAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "percentageNumerator",
                type: "uint256",
              },
            ],
            internalType: "struct IBerachefModule.Weight[]",
            name: "weights",
            type: "tuple[]",
          },
          {
            internalType: "int64",
            name: "startEpoch",
            type: "int64",
          },
        ],
        internalType: "struct IBerachefModule.CuttingBoard",
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
    name: "getQueuedCuttingBoard",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consAddr",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "receiverAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "percentageNumerator",
                type: "uint256",
              },
            ],
            internalType: "struct IBerachefModule.Weight[]",
            name: "weights",
            type: "tuple[]",
          },
          {
            internalType: "int64",
            name: "startEpoch",
            type: "int64",
          },
        ],
        internalType: "struct IBerachefModule.CuttingBoard",
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
        internalType: "address",
        name: "operatorAddr",
        type: "address",
      },
    ],
    name: "getQueuedCuttingBoard",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "consAddr",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "receiverAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "percentageNumerator",
                type: "uint256",
              },
            ],
            internalType: "struct IBerachefModule.Weight[]",
            name: "weights",
            type: "tuple[]",
          },
          {
            internalType: "int64",
            name: "startEpoch",
            type: "int64",
          },
        ],
        internalType: "struct IBerachefModule.CuttingBoard",
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
        components: [
          {
            internalType: "address",
            name: "receiverAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "percentageNumerator",
            type: "uint256",
          },
        ],
        internalType: "struct IBerachefModule.Weight[]",
        name: "weights",
        type: "tuple[]",
      },
      {
        internalType: "int64",
        name: "StartEpoch",
        type: "int64",
      },
    ],
    name: "queueNewCuttingBoard",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "operatorAddr",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "receiverAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "percentageNumerator",
            type: "uint256",
          },
        ],
        internalType: "struct IBerachefModule.Weight[]",
        name: "weights",
        type: "tuple[]",
      },
      {
        internalType: "int64",
        name: "StartEpoch",
        type: "int64",
      },
    ],
    name: "queueNewCuttingBoard",
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
