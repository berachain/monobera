import { Icons } from "@bera/ui/icons";

import { HeroCards } from "./hero-card";

export const Hero = () => {
  return (
    <div>
      <div className="mb-24 flex w-full flex-col items-center gap-3">
        <div className="flex w-fit gap-2 text-center text-xl font-bold leading-7 md:text-2xl">
          <Icons.bgtFav className="h-8 w-8" /> BGT Station
        </div>
        <div className="leading-15 relative w-fit text-center text-4xl font-bold md:text-7xl md:leading-[80px]">
          One stop shop
          <br />
          <span className="flex flex-row flex-wrap justify-center gap-3">
            for all your
            <span className="flex flex-row">
              BGT.
              <Icons.bgt className="translate-x-[-30%] translate-y-[-20%] drop-shadow-[0_15px_15px_rgba(251,191,36,0.5)] md:h-16 md:w-16" />
            </span>
          </span>
        </div>
      </div>
      <HeroCards />
    </div>
  );
};
