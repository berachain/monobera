import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";

export const POL = () => {
  return (
    <div className="mx-auto sm:flex w-screen flex-col gap-3 sm:gap-6 bg-background py-16 text-center sm:py-24 hidden ">
      <div className="text-3xl font-bold sm:text-5xl">
        What is{" "}
        <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text pr-4 italic text-transparent">
          {" "}
          Proof Of Liquidity
        </span>
      </div>
      <div className="mx-auto w-[400px] text-center text-sm sm:text-lg font-semibold leading-5 sm:leading-7 text-muted-foreground">
        Stake Your LP/Receipt Tokens to Earn BGT,
        <br />
        Stake BGT To Earn Incentives
      </div>
      <Image
        className="w-full"
        src={`${cloudinaryUrl}/BGT/izuinh4zsmabwqt06ohh`}
        alt="bg-dark"
        width={1250}
        height={174}
      />
    </div>
  );
};
