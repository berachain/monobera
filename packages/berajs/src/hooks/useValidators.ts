"use client";

import { validatorList } from "@bera/config";
import useSWRImmutable from "swr/immutable";
import { type Address } from "viem";

import POLLING from "~/config/constants/polling";

export interface IValidatorDefaultInformation {
  address: Address;
  logoURI: string;
}
interface IUseTokens {
  validatorList: IValidatorDefaultInformation[] | undefined;
  validatorDictionary:
    | { [key: Address]: IValidatorDefaultInformation }
    | undefined;
}

const useValidators = (): IUseTokens => {
  const { data } = useSWRImmutable(
    ["defaultValidatorList"],
    async () => {
      const res = await fetch(validatorList);

      const validatorInformation = await res.json();
      if (!validatorInformation) return { list: [], dictionary: {} };

      return {
        list: validatorInformation.validators,
        dictionary: validatorInformation.validatorMap,
      };
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  return {
    validatorList: data?.list ?? [],
    validatorDictionary: data?.dictionary ?? {},
  };
};

export default useValidators;
