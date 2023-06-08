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
        name: "",
        type: "int64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
