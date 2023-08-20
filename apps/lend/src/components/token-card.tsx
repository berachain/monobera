import Image from "next/image";
import { useRouter } from "next/navigation";
import { Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { type Market } from "~/hooks/useMarkets";
import Card from "./card";
import BorrowBtn from "./modals/borrow-button";
import SupplyBtn from "./modals/supply-button";

export default function TokenCard(market: { market: Market }) {
  const router = useRouter();
  return (
    <Card
      className="div-4 flex flex-col items-center justify-between gap-6 p-4 lg:flex-row"
      key={market.market.title}
    >
      <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:gap-6 lg:justify-start">
        <div className="mb-[22px] flex w-[160px] items-center gap-4 md:mb-0">
          <Image
            src={"/honey.png"}
            alt={market.market.title}
            className="rounded-full"
            width={48}
            height={48}
          />
          <div>
            <div className="text-xs	leading-5 text-muted-foreground">
              {market.market.title}
            </div>
            <div className="flex items-center gap-1 text-lg font-bold">
              $8.28M <Tooltip text={market.market.totalSupply} />
            </div>
          </div>
        </div>

        <div className="flex justify-between md:flex-col">
          <div className="flex items-center text-xs leading-5 text-muted-foreground ">
            Deposit APY
          </div>
          <div className="font-bold md:text-lg">
            {market.market.dailyPercentChange > 0 ? (
              <span className="text-success-foreground">
                {market.market.dailyPercentChange}%
              </span>
            ) : (
              <span className="text-destructive-foreground">
                {market.market.dailyPercentChange}%
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between text-muted-foreground md:flex-col">
          <div className="flex items-center text-xs leading-5">
            Variable Borrow APR
          </div>
          <div className="font-bold md:text-lg">
            {market.market.dailyPercentChange}%
          </div>
        </div>

        <div className="flex justify-between text-muted-foreground md:flex-col">
          <div className="flex items-center text-xs leading-5">
            Stable Borrow APR
          </div>
          <div className="font-bold md:text-lg">
            {market.market.dailyPercentChange}%
          </div>
        </div>

        <div className="flex justify-between text-muted-foreground md:flex-col">
          <div className="flex items-center text-xs leading-5 ">
            Total borrows
          </div>
          <div className="font-bold md:text-lg">
            {market.market.dailyBorrows}
          </div>
        </div>
      </div>

      <div className="flex w-full items-center gap-2 lg:w-fit">
        <SupplyBtn />
        <BorrowBtn />
        <Button
          variant={"secondary"}
          onClick={() =>
            router.push(
              "/markets/address=0x20f33CE90A13a4b5E7697E3544c3083B8F8A51D4",
            )
          }
        >
          <Icons.info />
        </Button>
      </div>
    </Card>
  );
}
