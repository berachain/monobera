import { Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import Card from "~/components/card";

export default function UserInfo() {
  const ticker = "ETH";

  return (
    <div className="w-full lg:w-[378px]">
      <div className="text-2xl font-semibold leading-loose">Your Info</div>
      <Card className="p-6">
        <div className="flex items-center gap-4 border-b border-border pb-4">
          <div className="h-fit w-fit rounded-full border border-border bg-muted p-2 hover:cursor-pointer md:rounded-lg">
            <Icons.wallet className="relative h-8 w-8 text-muted-foreground" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-sm text-muted-foreground">Wallet Balance</div>
            <div className="text-muted-foreground">
              <b className="text-foreground">0</b> {ticker}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className=" flex items-center justify-between">
            <div>
              <div className="text-xs font-medium leading-tight">
                Available to Supply{" "}
                <Tooltip text="This is the total amount that you are able to supply to in this reserve. You are able to supply your wallet balance up until the supply cap is reached." />
              </div>
              <div className="mt-[-2px] leading-7 text-muted-foreground">
                <b>0</b> {ticker}
              </div>
              <div className="text-xs font-medium leading-tight text-muted-foreground">
                $0.00
              </div>
            </div>
            <Button>Supply</Button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-medium leading-tight">
                Available to Borrow{" "}
                <Tooltip text="This is the total amount available for you to borrow. You can borrow based on your collateral and until the borrow cap is reached." />
              </div>
              <div className="mt-[-2px] leading-7 text-muted-foreground">
                <b>0</b> {ticker}
              </div>
              <div className="text-xs font-medium leading-tight text-muted-foreground">
                $0.00
              </div>
            </div>
            <Button>Supply</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
