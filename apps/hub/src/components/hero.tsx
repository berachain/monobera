import { Icons } from "@bera/ui/icons";

export const Hero = () => {
  return (
    <div className="mb-24 flex w-full flex-col items-center gap-3">
      {/* <div className="flex w-fit gap-2 text-center text-xl md:text-2xl font-bold leading-7">
        <Icons.bgtFav className="h-8 w-8" /> BGT Station
      </div>
     */}
      <div className="flex w-fit items-center gap-2 p-4 text-5xl font-bold">
        {/* <Icons.bgtFav className="h-8 w-8" />  */}
        Bera{" "}
        <span className="rounded-xs bg-orange-400 px-1 text-background">
          hub
        </span>
      </div>

      <div className="leading-15 relative w-fit text-center text-4xl font-bold md:text-7xl md:leading-[80px]">
        One stop shop
        <br />
        for all your BGT.
        <Icons.bgt className="absolute right-0 top-1/2 -translate-y-[20%] translate-x-[70%] transform drop-shadow-[0_15px_15px_rgba(251,191,36,0.5)] md:h-16 md:w-16" />
      </div>
    </div>
  );
};
