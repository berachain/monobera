import Link from "next/link";
import { formatter, useTokens } from "@bera/berajs";
import { TokenIcon, Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { type Asset } from "~/utils/types";
import Card from "./card";
import BorrowBtn from "./modals/borrow-button";
import SupplyBtn from "./modals/supply-button";

export default function TokenCard({ asset }: { asset: Asset }) {
  const { tokenDictionary } = useTokens();
  return (
    <>
      {tokenDictionary ? (
        <Card
          className="div-4 flex flex-col items-center justify-between gap-6 p-4 lg:flex-row"
          key={asset.asset_address}
        >
          <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:gap-6 lg:justify-start">
            <div className="mb-[22px] flex w-[250px] items-center gap-4 md:mb-0">
              <TokenIcon
                token={tokenDictionary[asset.asset_address]}
                size="2xl"
                key={asset.asset_address}
              />
              <div>
                <div className="text-xs	font-medium leading-5 text-muted-foreground">
                  {tokenDictionary[asset.asset_address]?.name}{" "}
                  <Tooltip
                    text={
                      "The data values below showcase the total assets supplied and their respective USD values."
                    }
                  />
                </div>
                <div className="text-lg font-bold leading-[22px]">
                  {formatter.format(asset.supplied)}{" "}
                  {tokenDictionary[asset.asset_address]?.symbol}
                </div>
                <div className=" text-xs font-medium leading-5">
                  ${formatter.format(asset.supplied * asset.dollarValue)}
                </div>
              </div>
            </div>

            <div className="flex justify-between md:flex-col md:justify-center">
              <div className="flex items-center text-xs font-medium leading-5 text-muted-foreground">
                Supply APR
              </div>
              <div className="font-bold text-success-foreground md:text-lg">
                {(asset.supplyAPR * 100).toFixed(2)}%
              </div>
            </div>

            <div className="flex justify-between text-muted-foreground md:flex-col md:justify-center">
              <div className="flex items-center text-xs font-medium leading-5">
                Variable Borrow APR
              </div>
              <div className="font-bold md:text-lg">
                {asset.borrowVariableAPR
                  ? `${(asset.borrowVariableAPR * 100).toFixed(2)}%`
                  : "~~"}
              </div>
            </div>

            <div className="flex justify-between text-muted-foreground md:flex-col md:justify-center">
              <div className="flex items-center text-xs font-medium leading-5">
                Stable Borrow APR
              </div>
              <div className="font-bold md:text-lg">
                {asset.borrowStableAPR
                  ? `${(asset.borrowStableAPR * 100).toFixed(2)}%`
                  : "~~"}
              </div>
            </div>

            <div className="flex justify-between text-muted-foreground md:flex-col md:justify-center">
              <div className="flex items-center text-xs font-medium leading-5">
                Total borrows
              </div>
              <div className="font-bold md:text-lg">
                {asset.borrowed ? formatter.format(asset.borrowed) : "~~"}
              </div>
            </div>
          </div>

          <div className="flex w-full items-center gap-2 lg:w-fit">
            <SupplyBtn asset={asset} />
            <BorrowBtn disabled={!asset.borrowed} asset={asset} />
            <Link href={`/markets/address=${asset.asset_address}`}>
              <Button variant={"outline"}>
                <Icons.info />
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
