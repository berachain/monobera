import { cloudinaryUrl } from "~/config";

export enum DelegateEnum {
  DELEGATE = "delegate",
  REDELEGATE = "redelegate",
  UNBOND = "unbond",
}

export const ImageMapEnum = {
  DELEGATE: `${cloudinaryUrl}/bears/cnxpzjyahdeh2imiwg4w`,
  REDELEGATE: `${cloudinaryUrl}/bears/bqsxs0wcfe2uc8fpests`,
  UNBOND: `${cloudinaryUrl}/bears/rcnaafyifc4jdhbkdfv8`,
} as const;