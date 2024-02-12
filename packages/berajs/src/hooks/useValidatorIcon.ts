"use client";

import useSWRImmutable from "swr/immutable";

export const useValidatorIcon = (description: string) => {
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

  const { isLoading, data = undefined } = useSWRImmutable(
    description,
    fetchValidatorIcon,
  );

  return {
    isLoading,
    data,
  };
};
