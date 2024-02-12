"use client";

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
  const get = async (url: string) => {
    return (
      await fetch(url, { referrerPolicy: "origin-when-cross-origin" })
    ).json();
  };

  const keybase = async (identity: string) => {
    return get(
      `https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`,
    );
  };

  const useValidatorIcon = (description: string) => {
    const { isLoading, data } = useSWRImmutable(description, () => {
      keybase(description)
        .then((d) => {
          if (Array.isArray(d.them)) {
            const uri = String(d.them[0]?.pictures?.primary?.url).replace(
              "https://s3.amazonaws.com/keybase_processed_uploads/",
              "",
            );
            console.log("uriiiii", uri);
            return uri;
          } else throw new Error(`failed to fetch avatar for ${description}.`);
        })
        .catch((error) => {
          console.error(error); // uncomment this if you want the user to see if the avatar failed to load.
        });
    });
    return {
      isLoading,
      data,
    };
  };
  const { data } = useSWRImmutable(
    ["defaultValidatorList"],
    async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_VALIDATOR_LIST as string);

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
