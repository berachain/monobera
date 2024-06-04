import { Address } from "viem";

import { BeraConfig, Validator } from "../../types";

export interface GetValidatorsInfo {
  validatorInfoList: Validator[];
  validatorInfoDictionary: { [key: Address]: Validator };
}

function validatorInfoListToDict(list: Validator[]): {
  [key: string]: Validator;
} {
  return list.reduce((acc: { [key: Address]: Validator }, item: Validator) => {
    acc[item.id] = item;
    return acc;
  }, {});
}

export const getValidatorsInfo = async (
  config: BeraConfig,
): Promise<GetValidatorsInfo> => {
  // if (!config.endpoints?.bgtEndpoint) {
  //   throw new Error("Missing backend endpoint in config");
  // }
  try {
    // const validatorList = await fetch(`${config.endpoints?.bgtEndpoint}/validators`);
    console.log("AAASADSDZFA");
    const validatorList = await fetch("berachain/v1alpha1/beacon/validators");
    const temp = await validatorList.json();
    return {
      validatorInfoList: temp.validators ?? [],
      validatorInfoDictionary: validatorInfoListToDict(
        temp.validavalidatorstors ?? [],
      ),
    };
  } catch (error) {
    console.error("Error fetching validator information", error);
    return {
      validatorInfoList: [],
      validatorInfoDictionary: {},
    };
  }
};
