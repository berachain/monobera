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

  // const useValidatorIcon = (description: string) => {
  //   const { isLoading, data } = useSWRImmutable(description, () => {
  //     keybase(description)
  //       .then((d) => {
  //         if (Array.isArray(d.them)) {
  //           const uri = String(d.them[0]?.pictures?.primary?.url).replace(
  //             "https://s3.amazonaws.com/keybase_processed_uploads/",
  //             "",
  //           );
  //           console.log("uriiiii", uri);
  //           return uri;
  //         } else throw new Error(`failed to fetch avatar for ${description}.`);
  //       })
  //       .catch((error) => {
  //         console.error(error); // uncomment this if you want the user to see if the avatar failed to load.
  //       });
  //   });
  //   return {
  //     isLoading,
  //     data,
  //   };
  // };
  // const fetchValidatorIcon = (identity: string) => {
  //   // fetch avatar from keybase
  //   return new Promise<void>((resolve) => {
  //     keybase(identity)
  //       .then((d) => {
  //         if (Array.isArray(d.them)) {
  //           const uri = String(d.them[0]?.pictures?.primary?.url).replace(
  //             "https://s3.amazonaws.com/keybase_processed_uploads/",
  //             "",
  //           );
  //           return uri;
  //         } else throw new Error(`failed to fetch avatar for ${identity}.`);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         resolve();
  //       });
  //   });
  // };

  const fetchValidatorIcon = async (description: string) => {
    try {
      const d = await keybase(description);
      if (Array.isArray(d.them)) {
        const uri = String(d.them[0]?.pictures?.primary?.url).replace(
          "https://s3.amazonaws.com/keybase_processed_uploads/",
          "",
        );
        console.log("uriiiii", uri);
        return uri;
      } else throw new Error(`failed to fetch avatar for ${description}.`);
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const { data } = useSWRImmutable(
    ["defaultValidatorList"],
    async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_VALIDATOR_LIST as string);

      const validatorInformation = await res.json();
      console.log(
        "validatorInformation?????????rrrrr",
        validatorInformation,
        validatorInformation.validatorMap,
        Object.values(validatorInformation.validatorMap),
      );
      if (!validatorInformation) return { list: [], dictionary: {} };
      // Fetch icons in parallel
      const iconPromises = validatorInformation.validators.map(
        async (validator: any) => {
          console.log("validator validatorrrrr ", validator.description);
          if (validator.description) {
            const iconUri = await fetchValidatorIcon(validator.description);
            return { address: validator.address, iconUri };
          }
        },
      );
      const iconsResults = await Promise.all(iconPromises);
      // Update validatorMap with icon information
      const updatedValidatorMap = { ...validatorInformation.validatorMap };
      iconsResults.forEach(({ address, iconUri }) => {
        if (iconUri && updatedValidatorMap[address]) {
          updatedValidatorMap[address].icon = iconUri;
        }
      });

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
