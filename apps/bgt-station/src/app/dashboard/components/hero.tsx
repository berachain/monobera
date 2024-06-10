import { cloudinaryUrl } from "@bera/config";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="w-full text-center container max-w-1280">
      <div className="text-4xl lg:text-6xl xl:text-8xl font-bold">
        Proof Of Liquidity
      </div>
      <div className="mx-auto mt-2 mb-9 sm:mb-24 w-full max-w-[600px] text-sm font-semibold leading-5 sm:mt-5 sm:text-lg sm:leading-7">
        Stake Your LP/Receipt Tokens from platforms and dAPPs to Earn BGT and,
        Stake BGT to Earn further Incentives from the entire berachain
        ecosystem. PoL as you envisioned it, is here.
      </div>
      <Image
        className="hidden dark:block w-full shadow-dark-shadow rounded-t-lg"
        src={`${cloudinaryUrl}/BGT/k3ot8i1kaxdd89w3gdzg`}
        alt="bg-dark"
        width={1138}
        height={174}
      />
      <Image
        className="dark:hidden block w-full shadow-dark-shadow rounded-t-lg"
        src={`${cloudinaryUrl}/BGT/rrykglymfpdy5axadw2u`}
        alt="bg-light"
        width={1138}
        height={174}
      />
    </div>
  );
};
