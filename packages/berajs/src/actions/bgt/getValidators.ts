import { Address } from "viem";

import {
  ActiveIncentive,
  BeraConfig,
  CuttingBoardWeight,
  Validator,
  Vault,
} from "~/types";

export interface ValidatorFilter {
  page?: number;
  limit?: number;
  gaugeAddress?: Address;
  sort?: string;
}

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
    market: "BEX",
    stakingToken: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
    name: "Vault One",
    imageUri: "http://example.com/vault1.png",
    website: "http://example.com/vault1",
    activeIncentives: mockActiveIncentives,
  },
  {
    address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
    market: "BEX",
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

const mockValidators: Validator[] = [
  {
    id: "0xB32C788C293e7779DB63bb3342F3dF59BdF7D6e5",
    name: "Validator One",
    description: "Validator One Description",
    website: "http://example.com/validator1",
    imageUri: "http://example.com/validator1.png",
    amountStaked: "100000",
    commission: "0.02",
    cuttingboard: mockCuttingBoardWeights,
    apy: "10",
    rewardRate: "1000",
    allTimeStats: {
      totalBgtDirected: "500000",
      totalHoneyValueBgtDirected: "200000",
      totalHoneyValueTokenRewards: "10000",
    },
  },
  {
    id: "0xd3Ae0e18e61CF9469b2d182f290bD16faF64E91D",
    name: "Validator Two",
    description: "Validator Two Description",
    website: "http://example.com/validator2",
    imageUri: "http://example.com/validator2.png",
    commission: "0.03",
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
  {
    id: "0x8c1DB3F893604C5398495A6d1E8Bc7DF18497803",
    name: "Validator Three",
    description: "Validator Three Description",
    website: "http://example.com/validator3",
    imageUri: "http://example.com/validator3.png",
    commission: "0.03",
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
  {
    id: "0xc900E813ff49DD72356C8BE79065ee055Ec1C80b",
    name: "Validator Three",
    description: "Validator Three Description",
    website: "http://example.com/validator3",
    imageUri: "http://example.com/validator3.png",
    commission: "0.03",
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
  {
    id: "0x06df557293c192c202A5f44372C302a145bb6cb6",
    name: "Validator Three",
    description: "Validator Three Description",
    website: "http://example.com/validator3",
    imageUri: "http://example.com/validator3.png",
    commission: "0.03",
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

export interface GetValidatorData {
  validatorList: Validator[];
  validatorDictionary: { [key: Address]: Validator };
}

export const getValidators = async (
  config: BeraConfig,
  filter?: ValidatorFilter,
): Promise<GetValidatorData> => {
  if (!config.endpoints?.validatorInfo) {
    throw new Error("Missing validator info endpoint in config");
  }
  try {
    // const validatorList = await fetch(config.endpoints.validatorInfo);
    // const temp = await validatorList.json();
    return {
      validatorList: mockValidators,
      validatorDictionary: mockValidators.reduce(
        (acc: { [key: Address]: Validator }, item: Validator) => {
          acc[item.id] = item;
          return acc;
        },
        {},
      ),
    };
  } catch (error) {
    console.error(error);
    return {
      validatorList: [],
      validatorDictionary: {},
    };
  }
};
