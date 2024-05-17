import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";

export const INTRO = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-12 text-center lg:flex-row lg:text-left">
        <div className="flex flex-col gap-6">
          <div className="text-center text-4xl font-bold capitalize lg:text-6xl xl:text-8xl lg:text-left">
            how to <br />
            earn
            <span className="ml-2 inline-flex w-fit items-center gap-1 rounded-md border-2 border-border bg-muted p-1 text-xl font-medium xl:ml-6 xl:p-3 xl:text-5xl">
              <Icons.bgt className="h-8 w-8 xl:h-[52px] xl:w-[52px]" />
              BGT
            </span>
          </div>
          <div className="text-lg leading-7">
            Stake Your LP/Receipt Tokens from <br /> platforms and dAPPs Into
            Gauge Vaults
          </div>
        </div>
        <div className="aspect-auto w-full max-w-[570px] lg:w-1/2">
          <Image
            src={`${cloudinaryUrl}/BGT/k3s2ocj0wygtix2pjqrg`}
            alt="bg-dark"
            width={570}
            height={225}
            className="hidden dark:block"
          />
          <Image
            src={`${cloudinaryUrl}/BGT/oonqwcl6w59knymw2cwn`}
            alt="bg-light"
            width={570}
            height={225}
            className="block dark:hidden"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse items-center justify-between gap-12 text-center lg:flex-row lg:text-left">
        <div className="aspect-auto w-full max-w-[570px] lg:w-[40%]">
          <Image
            src={`${cloudinaryUrl}/BGT/ldlgrugr5ib2jiqi488h`}
            alt="bg-dark"
            width={570}
            height={225}
            className="hidden dark:block"
          />
          <Image
            src={`${cloudinaryUrl}/BGT/fhfq9qzixcamjypyzhw3`}
            alt="bg-light"
            width={570}
            height={225}
            className="block dark:hidden"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-center text-4xl font-bold capitalize md:text-left lg:text-6xl xl:text-8xl whitespace-nowrap">
            how to <br />
            earn
            <span className="ml-2 inline-flex w-fit items-center gap-1 rounded-md border-2 border-border bg-muted p-1 text-xl font-medium xl:ml-6 xl:p-3 xl:text-5xl">
              <Icons.honey className="h-8 w-8 xl:h-[52px] xl:w-[52px]" />
              <Icons.beraIcon className="-ml-4 h-8 w-8 xl:h-[52px] xl:w-[52px]" />
              <Icons.bgt className="-ml-4 h-8 w-8 xl:h-[52px] xl:w-[52px]" />
              Incentives
            </span>
          </div>
          <div className="text-lg leading-7">
            Stake Your LP/Receipt Tokens from <br /> platforms and dAPPs Into
            Gauge Vaults
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-12 text-center lg:flex-row lg:text-left">
        <div className="flex flex-col gap-6">
          <div className="text-center text-4xl font-bold capitalize md:text-left lg:text-6xl xl:text-8xl">
            how to <br />
            Incentivize
          </div>
          <div className="text-lg leading-7">
            Stake Your LP/Receipt Tokens from <br /> platforms and dAPPs Into
            Gauge Vaults
          </div>
        </div>
        <div className="aspect-auto w-full max-w-[570px] lg:w-1/2">
          <Image
            src={`${cloudinaryUrl}/BGT/e1sadhyga0nawrkfjnn3`}
            alt="bg-dark"
            width={570}
            height={225}
            className="hidden dark:block"
          />
          <Image
            src={`${cloudinaryUrl}/BGT/o0rnb49hueobioms6gui`}
            alt="bg-light"
            width={570}
            height={225}
            className="block dark:hidden"
          />
        </div>
      </div>
    </>
  );
};
