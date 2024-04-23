import { Token } from "@bera/berajs";
import { nativeTokenAddress } from "@bera/config";

export const wBeraToken: Token = {
  address: nativeTokenAddress,
  decimals: 18,
  name: "WBera",
  symbol: "WBERA",
  logoURI:
    "https://artio-static-asset-public.s3.ap-southeast-1.amazonaws.com/assets/wbera.png",
};
