import Image from "next/image";
import { useRouter } from "next/navigation";
import { Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { type Market } from "~/hooks/useMarkets";
import Card from "./card";
import BorrowBtn from "./modals/borrow-button";
import SupplyBtn from "./modals/supply-button";

export default function UserTokenCard({
  market,
}: {
  market: Market;
  type: "user-supply" | "user-borrow" | "supply" | "borrow";
}) {
  const router = useRouter();

  return (
    <Card key={market.title} className="flex items-center justify-between p-4">
      <div className="flex">
        <div className="mr-10 flex items-center gap-4">
          <Image
            src={"/honey.png"}
            alt={market.title}
            className="rounded-full"
            width={32}
            height={32}
          />
          <div>
            <p className="text-xs	leading-5 text-muted-foreground">
              {market.title}
            </p>
            <p className="text-lg font-bold">
              $8.28M <Tooltip text={market.totalSupply} />
            </p>
          </div>
        </div>

        <div className="grow-1 flex gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs leading-5 text-muted-foreground">
              Deposit APY
            </p>
            <p className="text-lg font-bold">
              {market.dailyPercentChange > 0 ? (
                <span className="text-positive">
                  +{market.dailyPercentChange}%
                </span>
              ) : (
                <span className="text-negative">
                  -{market.dailyPercentChange}%
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="grow-1 flex items-center gap-2">
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
      </div>
    </Card>
  );
}
