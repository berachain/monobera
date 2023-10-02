import { useSelectedAssetWalletBalance, type Token } from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

import Card from "~/components/card";
import BorrowBtn from "~/components/modals/borrow-button";
import SupplyBtn from "~/components/modals/supply-button";

// import SupplyBtn from "~/components/modals/supply-button";

export default function UserInfo({ token }: { token: Token | undefined }) {
  const tokenBalance = useSelectedAssetWalletBalance(token?.address ?? "");

  return (
    <div className="w-full flex-shrink-0 lg:w-[378px]">
      {token ? (
        <div>
          <div className="text-2xl font-semibold leading-loose">Your Info</div>
          <Card className="p-6">
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <div className="h-fit w-fit rounded-full border border-border bg-muted p-2 hover:cursor-pointer md:rounded-lg">
                <Icons.wallet className="relative h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-sm text-muted-foreground">
                  Wallet Balance
                </div>
                <div className="text-muted-foreground">
                  <b className="text-foreground">
                    {tokenBalance?.formattedBalance}
                  </b>{" "}
                  {token.symbol}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium leading-tight">
                    Available to Supply{" "}
                    <Tooltip text="This is the total amount that you are able to supply to in this reserve. You are able to supply your wallet balance up until the supply cap is reached." />
                  </div>
                  <div className="mt-[-2px] leading-7 text-muted-foreground">
                    <b>??</b> {token.symbol}
                  </div>
                  <div className="text-xs font-medium leading-tight text-muted-foreground">
                    $0.00
                  </div>
                </div>
                <SupplyBtn token={token} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium leading-tight">
                    Available to Borrow{" "}
                    <Tooltip text="This is the total amount available for you to borrow. You can borrow based on your collateral and until the borrow cap is reached." />
                  </div>
                  <div className="mt-[-2px] leading-7 text-muted-foreground">
                    <b>??</b> {token.symbol}
                  </div>
                  <div className="text-xs font-medium leading-tight text-muted-foreground">
                    $0.00
                  </div>
                </div>
                <BorrowBtn token={token} />
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div>Loading</div>
      )}{" "}
    </div>
  );
}
