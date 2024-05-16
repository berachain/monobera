import {
  ActiveIncentive,
  CuttingBoardWeight,
  Market,
  UserValidator,
  Validator,
  Vault,
} from "~/types";

const mockMarkets: Market[] = [
  {
    id: "native",
    name: "Market One",
    imageUri: "http://example.com/market1.png",
    website: "http://example.com/market1",
  },
  {
    id: "native",
    name: "Market Two",
    imageUri: "http://example.com/market2.png",
    website: "http://example.com/market2",
  },
];

const mockActiveIncentives: ActiveIncentive[] = [
  {
    token: {
      symbol: "TKN",
      decimals: 18,
      address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      name: "",
    },
    incentiveRate: "0.05",
    amountLeft: "1000",
  },
  {
    token: {
      symbol: "TKN2",
      decimals: 18,
      address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0dD",
      name: "",
    },
    incentiveRate: "0.05",
    amountLeft: "1000",
  },
  {
    token: {
      symbol: "TKN3",
      decimals: 18,
      address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb1aD",
      name: "",
    },
    incentiveRate: "0.05",
    amountLeft: "1000",
  },
  {
    token: {
      symbol: "TKN5",
      decimals: 18,
      address: "0xb10a6CE3423Bf521EcB144b416F42D55A22e10aD",
      name: "",
    },
    incentiveRate: "0.05",
    amountLeft: "1000",
  },
  {
    token: {
      symbol: "TKN6",
      decimals: 18,
      address: "0xd10a6CE3423Bf521EcB144b416F42D55A22e10aD",
      name: "",
    },
    incentiveRate: "0.05",
    amountLeft: "1000",
  },
  {
    token: {
      symbol: "ALT",
      decimals: 18,
      address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
      name: "",
    },
    incentiveRate: "0.10",
    amountLeft: "500",
  },
];

const mockVaults: Vault[] = [
  {
    address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
    market: mockMarkets[0],
    stakingToken: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
    name: "Vault One",
    imageUri: "http://example.com/vault1.png",
    website: "http://example.com/vault1",
    activeIncentives: mockActiveIncentives,
  },
  {
    address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
    market: mockMarkets[1],
    stakingToken: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
    name: "Vault Two",
    imageUri: "http://example.com/vault2.png",
    website: "http://example.com/vault2",
    activeIncentives: mockActiveIncentives,
  },
];

const mockCuttingBoardWeights: CuttingBoardWeight[] = [
  {
    percentage: 20,
    amount: 200,
    receiver: mockVaults[0],
  },
  {
    percentage: 30,
    amount: 300,
    receiver: mockVaults[1],
  },
];

const mockValidators: UserValidator[] = [
  {
    coinbase: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
    name: "Validator One",
    amountStaked: "100000",
    commission: "0.02",
    description: "A reliable and efficient validator.",
    website: "http://example.com/validator1",
    imageUri: "http://example.com/validator1.png",
    cuttingboard: mockCuttingBoardWeights,
    userStaked: "100000",
    apy: "10",
    rewardRate: "1000",
    allTimeStats: {
      totalBgtDirected: "500000",
      totalHoneyValueBgtDirected: "200000",
      totalHoneyValueTokenRewards: "10000",
    },
  },
  {
    coinbase: "0xb10a6CE3423Bf521EcB144b416F42D55A12eb0aD",
    name: "Validator Two",
    userStaked: "100000",
    commission: "0.03",
    description: "A highly secure validator with a focus on stability.",
    website: "http://example.com/validator2",
    imageUri: "http://example.com/validator2.png",
    amountStaked: "2000000",
    cuttingboard: mockCuttingBoardWeights,
    apy: "12",
    rewardRate: "1000",
    allTimeStats: {
      totalBgtDirected: "600000",
      totalHoneyValueBgtDirected: "250000",
      totalHoneyValueTokenRewards: "15000",
    },
  },
];

export const getValidators = async (page: number): Promise<Validator[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (page === 0) return mockValidators;
    return [mockValidators[1]];
  } catch (error) {
    console.error(error);
    return [];
  }
};
