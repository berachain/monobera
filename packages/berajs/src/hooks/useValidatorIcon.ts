import useSWRImmutable from "swr/immutable";
import { useLocalStorage } from "usehooks-ts";
import { type Address } from "viem";

export const useValidatorIcon = (
  identity: string | undefined,
  address: Address,
) => {
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
    try {
      if (validatorIcon) {
        return validatorIcon;
      }
      const d = await keybase(identity);
      if (Array.isArray(d.them)) {
        const uri = String(d.them[0]?.pictures?.primary?.url).replace(
          "https://s3.amazonaws.com/keybase_processed_uploads/",
          "",
        );
        setValidatorIcon(uri);
        return uri;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading, data = undefined } = useSWRImmutable(
    identity,
    fetchValidatorIcon,
  );

  return {
    isLoading,
    data,
  };
};
