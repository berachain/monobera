import React from "react";
import Image from "next/image";
import { Icons } from "@bera/ui/icons";

export default function HoneyBanner() {
  return (
    <div className="mt-20 grid grid-cols-6">
      <div className="col-span-3">
        <div className="mb-4 max-w-[250px]">
          <Image src={"/coinIcons.png"} alt="Coins" width={811} height={151} />
        </div>
        <h1>Switch To Honey</h1>
        <p>Turn your favourite stables into Honey.</p>
        <p>Leverage liquidity incentives on various platforms.</p>
      </div>
      <div className="col-span-1">
        <div>
          <h3>Lend HONEY on Baave</h3>
          <a href="" target="_blank">
            <Icons.helpingHand />
            Lend
          </a>
        </div>
      </div>

      <div className="col-span-1">
        <div>
          <h3>Add Liquidity to HONEY Pools</h3>
          <a href="" target="_blank">
            <Icons.plus />
            Add
          </a>
        </div>
      </div>
      <div className="col-span-1">
        <div>
          <h3>Provide Collateral for Perpetuals</h3>
          <a href="" target="_blank">
            <Icons.plus />
            provide
          </a>
        </div>
      </div>
    </div>
  );
}
