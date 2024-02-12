import useSWRImmutable from "swr/immutable";

export const useValidatorIcon = (description: string) => {
  const keybase = async (identity: string) => {
    return (
      await fetch(
        `https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`,
        { referrerPolicy: "origin-when-cross-origin" },
      )
    ).json();
  };

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
      }
    } catch (error) {
      console.error(error);
      throw new Error(`failed to fetch avatar for ${description}.`);
    }
  };

  const { isLoading, data = undefined } = useSWRImmutable(
    description,
    fetchValidatorIcon,
  );

  return {
    isLoading,
    data,
  };
};
