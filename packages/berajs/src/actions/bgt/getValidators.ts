import { Address } from "viem";

import {
  ActiveIncentive,
  BeraConfig,
  CuttingBoardWeight,
  ValidatorData,
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

const mockValidators: ValidatorData[] = [
  {
    id: "0x6B7C3B5c0928cf8D0B516b358a1e3aecf5E9AFBe",
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
    id: "0x82Cf147a9aC43A84D30f71f8a627492D08e485Ef",
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
    id: "0xE7E474C22Ea47EbD5212B310F2E7Ae8c7ce70b4b",
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
  validatorList: ValidatorData[];
  validatorDictionary: { [key: Address]: ValidatorData };
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
        (acc: { [key: Address]: ValidatorData }, item: ValidatorData) => {
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
