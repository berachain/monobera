import { isIPFS } from "@bera/config";

/**
 * Returns the path for a rewards vault under the HUB website.
 *
 * It's IPFS compatible.
 * @returns
 */
export const getRewardsVaultUrl = (
  address: string,
  isMyVault?: boolean,
): string => {
  return isIPFS
    ? `/vaults/vault?address=${address}${isMyVault ? "&my-gauge" : ""}`
    : `/vaults/${address}${isMyVault ? "?my-gauge" : ""}`;
};

export const getHubValidatorPath = (address: string): string => {
  return isIPFS
    ? `/validators/validator/?address=${address}`
    : `/validators/${address}`;
};
