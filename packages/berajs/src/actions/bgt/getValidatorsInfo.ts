import { Address } from "viem";

import { BeraConfig, Validator } from "../../types";

export interface GetValidatorsInfo {
  validatorInfoList: Validator[];
  validatorInfoDictionary: { [key: Address]: Validator };
}

export interface ValidatorFilter {
  vaultId?: string;
}

export const getValidatorsInfo = async (
  config: BeraConfig,
  filter?: ValidatorFilter,
): Promise<GetValidatorsInfo> => {
  // if (!config.endpoints?.bgtEndpoint) {
  //   throw new Error("Missing backend endpoint in config");
  // }
  try {
    // const url = `${config.endpoints?.bgtEndpoint}/validators`
    let url = "http://localhost:3001/berachain/v1alpha1/beacon/validators";
    if (filter) {
      let isFirstParam = true;
      Object.keys(filter).forEach((key) => {
        const filterKey = key as keyof typeof filter;
        url += `${isFirstParam ? "?" : "&"}${filterKey}=${filter[filterKey]}`;
        isFirstParam = false;
      });
    }
    const validatorList = await fetch(url);
    const temp = await validatorList.json();
    console.log(temp);
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
