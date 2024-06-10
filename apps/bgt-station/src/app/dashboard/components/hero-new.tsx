import { Icons } from "@bera/ui/icons";

export const Hero = () => {
  return (
    <div className="mb-24 flex w-full flex-col items-center gap-3">
      <div className="flex w-fit gap-2 text-center text-xl md:text-2xl font-bold leading-7">
        <Icons.bgtFav className="h-8 w-8" /> BGT Station
      </div>
      <div className="relative w-fit text-center text-4xl md:text-7xl font-bold leading-15 md:leading-[80px]">
        One stop shop
        <br />
        for all your BGT.
        <Icons.bgt className="absolute right-0 top-1/2 md:h-16 md:w-16 -translate-y-[20%] translate-x-[70%] transform drop-shadow-[0_15px_15px_rgba(251,191,36,0.5)]" />
      </div>
    </div>
  );
};
