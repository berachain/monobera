import { BeraConfig, ValidatorList } from "../../types";
import { Token } from "../../types/dex";

export interface GetValidatorsRequest {
  config: BeraConfig;
}

export interface GetValidators {
  validatorList?: ValidatorList[] | undefined;
  validatorDictionary?: { [key: string]: ValidatorList } | undefined;
}

/**
 * fetch and format the token list
 */
function validatorListToDict(list: ValidatorList[]): {
  [key: string]: ValidatorList;
} {
  return list.reduce((acc, item) => {
    // @ts-ignore
    acc[item.id.toLowerCase()] = item;
    return acc;
  }, {});
}

export const getValidators = async ({
  config,
}: GetValidatorsRequest): Promise<GetValidators> => {
  if (!config.endpoints?.validatorList) {
    return {
      validatorList: [],
      validatorDictionary: validatorListToDict([]),
    };
  }
  try {
    const tokenList = await fetch(config.endpoints?.validatorList);
    const temp = await tokenList.json();
    if (!temp.validators)
      return {
        validatorList: [],
        validatorDictionary: {},
      };
    const defaultList = temp.validators.map((validator: any) => {
      return { ...validator };
    });

    const list = [...defaultList];

    const uniqueList = list.filter(
      (item, index) =>
        list.findIndex((i) => i.address === item.address) === index,
    );

    return {
      validatorList: uniqueList,
      validatorDictionary: validatorListToDict(list),
    };
  } catch (error) {
    console.error("Error fetching validator list", error);
    return {
      validatorList: [],
      validatorDictionary: {},
    };
  }
};
