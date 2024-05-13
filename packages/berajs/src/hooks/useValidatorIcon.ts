import useSWRImmutable from "swr/immutable";
import { useLocalStorage } from "usehooks-ts";
import { Address } from "viem";

import { getValidatorIcon } from "~/actions/bgt";

interface IUseValidatorIconRequest {
  address: Address | undefined;
}

interface IUseValidatorIconResponse {
  isLoading: boolean;
  isValidating: boolean;
  data: string | undefined;
}

export const useValidatorIcon = ({
  address,
}: IUseValidatorIconRequest): IUseValidatorIconResponse => {
  const [validatorIcon, setValidatorIcon] = useLocalStorage<string | undefined>(
    `VALIDATOR_ICON_${address}`,
    "",
  );

  const keybase = async (identity: string | undefined) => {
    if (!identity) return Promise.resolve({ status: "error" });
    return (
      // TODO: point to default list
      (
        await fetch(
          `https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${address}&fields=pictures`,
          { referrerPolicy: "origin-when-cross-origin" },
        )
      ).json()
    );
  };

  const fetchValidatorIcon = async (identity: string) => {
    const validatorIconURI = await getValidatorIcon({
      validatorIcon,
      identity,
      keybase,
    });
    setValidatorIcon(validatorIconURI);
  };

  const {
    isLoading,
    isValidating,
    data = undefined,
  } = useSWRImmutable(address, fetchValidatorIcon);

  return {
    isLoading,
    isValidating,
    data,
  };
};
