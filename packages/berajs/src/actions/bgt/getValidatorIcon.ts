/**
 * fetch the icon for the given validator
 */

export const getValidatorIcon = async ({
  validatorIcon,
  identity,
  keybase,
}: {
  validatorIcon: string | undefined;
  identity: string;
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
      return uri;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
