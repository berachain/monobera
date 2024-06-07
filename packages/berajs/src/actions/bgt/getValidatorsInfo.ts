import { Address } from "viem";

import { BeraConfig, Validator } from "../../types";

export interface GetValidatorsInfo {
  counts: number;
  validatorInfoList: Validator[];
  validatorInfoDictionary: { [key: Address]: Validator };
}

export interface ValidatorFilter {
  vaultId?: string;
  sortBy?: "votingpower" | "commission" | "apy";
  sortOrder?: "asc" | "desc";
  page?: number;
  query?: string;
  pageSize?: number;
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
    return {
      counts: temp.total ?? 0,
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
      counts: 0,
      validatorInfoList: [],
      validatorInfoDictionary: {},
    };
  }
};
