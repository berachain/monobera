import { cloudinaryUrl } from "@bera/config";

export enum DelegateEnum {
  DELEGATE = "delegate",
  UNBOND = "unbond",
}

export const ImageMapEnum = {
  DELEGATE: {
    light: `${cloudinaryUrl}/bears/bee-hive/cnxpzjyahdeh2imiwg4w`,
    dark: `${cloudinaryUrl}/bears/bee-hive/Delegate_darkMode_oujnpn`,
  },
  REDELEGATE: {
    light: `${cloudinaryUrl}/bears/bee-hive/bqsxs0wcfe2uc8fpests`,
    dark: `${cloudinaryUrl}/bears/bee-hive/Redelegate_darkMode_whypcu`,
  },
  UNBOND: {
    light: `${cloudinaryUrl}/bears/bee-hive/rcnaafyifc4jdhbkdfv8`,
    dark: `${cloudinaryUrl}/bears/bee-hive/Unbond_darkMode_rgzrfh`,
  },
} as const;
