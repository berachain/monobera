import useSWRImmutable from "swr/immutable";
import { useLocalStorage } from "usehooks-ts";

import { getValidatorIcon } from "~/actions/bgt";

interface IUseValidatorIconRequest {
  identity: string;
  address: string | undefined;
}

interface IUseValidatorIconResponse {
  isLoading: boolean;
  isValidating: boolean;
  data: string | undefined;
}

export const useValidatorIcon = ({
  identity,
  address,
}: IUseValidatorIconRequest): IUseValidatorIconResponse => {
  const [validatorIcon, setValidatorIcon] = useLocalStorage<string>(
    `VALIDATOR_ICON_${address}`,
    "",
  );

  const keybase = async (identity: string) => {
    return (
      await fetch(
        `https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`,
        { referrerPolicy: "origin-when-cross-origin" },
      )
    ).json();
  };

  const fetchValidatorIcon = async (identity: string) => {
    return getValidatorIcon({
      validatorIcon,
      identity,
      setValidatorIcon,
      keybase,
    });
  };

  const {
    isLoading,
    isValidating,
    data = undefined,
  } = useSWRImmutable(identity, fetchValidatorIcon);

  return {
    isLoading,
    isValidating,
    data,
  };
};
