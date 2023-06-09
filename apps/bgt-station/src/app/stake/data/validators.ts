export interface Validator {
  name: string;
  address: `0x${string}`;
  votingPower: string;
  cuttingBoard: number[];
  commission: number;
  bribes: string[];
  bribeAPR: number;
}

export const validators: Validator[] = [
  {
    name: "Validator A",
    address: "0x1234567890",
    votingPower: "69,420,420.00",
    cuttingBoard: [30, 20, 25, 15, 10],
    commission: 5,
    bribes: ["Token A", "Token B", "Token C"],
    bribeAPR: 3.5,
  },
  {
    name: "Validator B",
    address: "0x1234567890",
    votingPower: "69,420,420.00",
    cuttingBoard: [10, 25, 15, 30, 20],
    commission: 7,
    bribes: ["Token B", "Token C", "Token D"],
    bribeAPR: 4.2,
  },
  {
    name: "Validator C",
    address: "0x1234567890",
    votingPower: "69,420,420.00",
    cuttingBoard: [20, 30, 10, 15, 25],
    commission: 3,
    bribes: ["Token C", "Token D", "Token E"],
    bribeAPR: 5.1,
  },
  {
    name: "Validator D",
    address: "0x1234567890",
    votingPower: "69,420,420.00",
    cuttingBoard: [15, 10, 20, 30, 25],
    commission: 8,
    bribes: ["Token D", "Token E", "Token F"],
    bribeAPR: 4.8,
  },
  {
    name: "Validator E",
    address: "0x1234567890",
    votingPower: "69,420,420.00",
    cuttingBoard: [25, 15, 30, 20, 10],
    commission: 6,
    bribes: ["Token E", "Token F", "Token G"],
    bribeAPR: 3.9,
  },
  {
    name: "Validator F",
    address: "0x1234567890",
    votingPower: "69,420,420.00",
    cuttingBoard: [20, 25, 10, 30, 15],
    commission: 4,
    bribes: ["Token F", "Token G", "Token H"],
    bribeAPR: 4.5,
  },
  {
    name: "Validator G",
    address: "0x1234567890",
    votingPower: "69,420,420.00",
    cuttingBoard: [10, 30, 25, 15, 20],
    commission: 5,
    bribes: ["Token G", "Token H", "Token I"],
    bribeAPR: 5.3,
  },
  {
    name: "Validator H",
    address: "0x1234567890",
    votingPower: "69,420,420.00",
    cuttingBoard: [15, 20, 30, 10, 25],
    commission: 6,
    bribes: ["Token H", "Token I", "Token J"],
    bribeAPR: 4.2,
  },
  {
    name: "Validator I",
    address: "0x1234567890",
    votingPower: "69,420,420.00",
    cuttingBoard: [30, 15, 10, 25, 20],
    commission: 3,
    bribes: ["Token I", "Token J", "Token K"],
    bribeAPR: 4.9,
  },
  {
    name: "Validator J",
    address: "0x1234567890",
    votingPower: "69,420,420.00",
    cuttingBoard: [25, 20, 15, 10, 30],
    commission: 7,
    bribes: ["Token J", "Token K", "Token L"],
    bribeAPR: 5.7,
  },
];
