import { Token } from "@bera/berajs";
import { nativeTokenAddress } from "@bera/config";

export const beraToken: Token = {
  address: nativeTokenAddress,
  decimals: 18,
  name: "Bera",
  symbol: "BERA",
  logoURI:
    "https://artio-static-asset-public.s3.ap-southeast-1.amazonaws.com/assets/bera.png",
};
