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
          key={asset.address}
        >
          <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:gap-6 lg:justify-start">
            <div className="mb-[22px] flex w-[250px] items-center gap-4 md:mb-0">
              <TokenIcon
                token={tokenDictionary[asset.address]}
                size="2xl"
                key={asset.address}
              />
              <div>
                <div className="text-xs	font-medium leading-5 text-muted-foreground">
                  {tokenDictionary[asset.address]?.name}{" "}
                  <Tooltip
                    text={
                      "The data values below showcase the total assets supplied and their respective USD values."
                    }
                  />
                </div>
                <div className="text-lg font-bold leading-[22px]">
                  {formatter.format(asset.totalSupplied)}{" "}
                  {tokenDictionary[asset.address]?.symbol}
                </div>
                <div className=" text-xs font-medium leading-5">
                  ${formatter.format(asset.totalSupplied * asset.dollarValue)}
                </div>
              </div>
            </div>

            <div className="flex justify-between md:flex-col md:justify-center">
              <div className="flex items-center text-xs font-medium leading-5 text-muted-foreground">
                Supply APY
              </div>
              <div className="font-bold text-success-foreground md:text-lg">
                {asset.supplyAPR * 100}%
              </div>
            </div>

            <div className="flex justify-between text-muted-foreground md:flex-col md:justify-center">
              <div className="flex items-center text-xs font-medium leading-5">
                Variable Borrow APR
              </div>
              <div className="font-bold md:text-lg">
                {asset.borrowAPR ? `${asset.borrowAPR * 100}%` : "~~"}
              </div>
            </div>

            <div className="flex justify-between text-muted-foreground md:flex-col md:justify-center">
              <div className="flex items-center text-xs font-medium leading-5">
                Stable Borrow APR
              </div>
              <div className="font-bold md:text-lg">
                {asset.borrowAPR ? `${asset.borrowAPR * 100}%` : "~~"}
              </div>
            </div>

            <div className="flex justify-between text-muted-foreground md:flex-col md:justify-center">
              <div className="flex items-center text-xs font-medium leading-5">
                Total borrows
              </div>
              <div className="font-bold md:text-lg">
                {asset.totalBorrowed
                  ? formatter.format(asset.totalBorrowed)
                  : "~~"}
              </div>
            </div>
          </div>

          <div className="flex w-full items-center gap-2 lg:w-fit">
            <SupplyBtn />
            <BorrowBtn disabled={!asset.totalBorrowed} />
            <Link href={`/markets/address=${asset.address}`}>
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
