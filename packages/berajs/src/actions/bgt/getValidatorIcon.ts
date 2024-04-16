/**
 * fetch the icon for the given validator
 */

export const getValidatorIcon = async ({
  validatorIcon,
  identity,
  setValidatorIcon,
  keybase,
}: {
  validatorIcon: string | undefined;
  identity: string;
  setValidatorIcon: (uri: string) => void;
  keybase: (identity: string) => Promise<any>;
}): Promise<string | undefined> => {
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
    return undefined;
  }
};
