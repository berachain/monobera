import Link from "next/link";
import { formatter, useTokens, type Token } from "@bera/berajs";
import { TokenIcon, Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { formatUnits } from "viem";

import InfoButton from "~/components/info-button";
import Card from "./card";
import BorrowBtn from "./modals/borrow-button";
import SupplyBtn from "./modals/supply-button";

export default function TokenCard({
  reserveData,
  token,
}: {
  reserveData: any;
  token: Token;
}) {
  const { tokenDictionary } = useTokens();
  return (
    <>
      {tokenDictionary ? (
        <Card className="div-4 flex flex-col items-center justify-between gap-6 p-4 lg:flex-row">
          <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:gap-6 lg:justify-start">
            <div className="mb-[22px] flex w-[250px] items-center gap-4 md:mb-0">
              <TokenIcon token={token} size="2xl" />
              <div>
                <div className="text-xs	font-medium leading-5 text-muted-foreground">
                  {token?.name}
                  <Tooltip
                    text={
                      "The data values below showcase the total assets supplied and their respective USD values."
                    }
                  />
                </div>
                <div className="text-lg font-bold leading-[22px]">
                  ??
                  {token.symbol}
                </div>
                <div className=" text-xs font-medium leading-5">$??</div>
              </div>
            </div>

            <div className="flex justify-between md:flex-col md:justify-center">
              <div className="flex items-center text-xs font-medium leading-5 text-muted-foreground">
                Supply APR
              </div>
              <div className="font-bold text-success-foreground md:text-lg">
                {Number(
                  formatUnits(reserveData.currentLiquidityRate, 18) * 100,
                ).toFixed(2)}
                %
              </div>
            </div>

            <div className="flex justify-between text-muted-foreground md:flex-col md:justify-center">
              <div className="flex items-center text-xs font-medium leading-5">
                Variable Borrow APR
              </div>
              <div className="font-bold md:text-lg">
                {Number(
                  formatUnits(reserveData.currentVariableBorrowRate, 18) * 100,
                ).toFixed(2)}
                %
              </div>
            </div>

            <div className="flex justify-between text-muted-foreground md:flex-col md:justify-center">
              <div className="flex items-center text-xs font-medium leading-5">
                Stable Borrow APR
              </div>
              <div className="font-bold md:text-lg">
                {Number(
                  formatUnits(reserveData.currentStableBorrowRate, 18) * 100,
                ).toFixed(2)}
                %
              </div>
            </div>

            <div className="flex justify-between text-muted-foreground md:flex-col md:justify-center">
              <div className="flex items-center text-xs font-medium leading-5">
                Total borrows
              </div>
              <div className="font-bold md:text-lg">{"~~"}</div>
            </div>
          </div>

          <div className="flex w-full items-center gap-2 lg:w-fit">
            <SupplyBtn token={token} />
            <BorrowBtn token={token} />
            <InfoButton address={token.address} />
          </div>
        </Card>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
