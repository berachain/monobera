import { Address } from "viem";

import { BeraConfig, Validator } from "../../types";

export interface GetValidatorsInfo {
  validatorInfoList: Validator[];
  validatorInfoDictionary: { [key: Address]: Validator };
}

export const getValidatorsInfo = async (
  config: BeraConfig,
): Promise<GetValidatorsInfo> => {
  if (!config.endpoints?.bgtEndpoint) {
    throw new Error("Missing backend endpoint in config");
  }
  try {
    // const validatorList = await fetch(`${config.endpoints?.bgtEndpoint}/validators`);
    const validatorList = await fetch(
      "http://localhost:3001/berachain/v1alpha1/beacon/validators",
    );
    const temp = await validatorList.json();
    return {
      validatorInfoList: temp.validators ?? [],
      validatorInfoDictionary: (temp.validators ?? []).reduce(
        (acc: { [key: Address]: Validator }, item: Validator) => {
          acc[item.id] = item;
          return acc;
        },
        {},
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
