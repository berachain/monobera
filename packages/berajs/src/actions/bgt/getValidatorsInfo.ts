import { Address } from "viem";

import { BeraConfig, ValidatorInfo } from "../../types";

export interface GetValidatorsInfo {
  validatorInfoList: ValidatorInfo[];
  validatorInfoDictionary: { [key: Address]: ValidatorInfo };
}

function validatorInfoListToDict(list: ValidatorInfo[]): {
  [key: string]: ValidatorInfo;
} {
  return list.reduce(
    (acc: { [key: Address]: ValidatorInfo }, item: ValidatorInfo) => {
      acc[item.id] = item;
      return acc;
    },
    {},
  );
}

export const getValidatorsInfo = async (
  config: BeraConfig,
): Promise<GetValidatorsInfo> => {
  if (!config.endpoints?.validatorInfo) {
    throw new Error("Missing validator info endpoint in config");
  }
  try {
    const validatorList = await fetch(config.endpoints.validatorInfo);
    const temp = await validatorList.json();
    return {
      validatorInfoList: temp.validators ?? [],
      validatorInfoDictionary: validatorInfoListToDict(temp.validators ?? []),
    };
  } catch (error) {
    console.error("Error fetching validator information", error);
    return {
      validatorInfoList: [],
      validatorInfoDictionary: {},
    };
  }
};
