import React from "react";
import { honeyTokenAddress } from "@bera/config";
import { NotFoundBear } from "@bera/shared-ui";

import UserTokenCard from "~/components/user-token-card";

export default function AvailableSupply({ assets }: { assets: any[] }) {
  return (
    <>
      <div>
        <div className="text-2xl font-semibold leading-loose">
          Available to Deposit
        </div>
        <div className="text-sm leading-5 text-muted-foreground">
          You can deposit the following assets to borrow HONEY
        </div>
      </div>
      {assets && assets.length > 0 ? (
        <>
          {assets
            .sort((a, b) => {
              if (a.address === honeyTokenAddress) return -1;
              if (b.address === honeyTokenAddress) return 1;
              return b.address.localeCompare(a.address);
            })

            .map((asset, index) => (
              <UserTokenCard asset={asset} key={index} type="supply" />
            ))}
        </>
      ) : (
        <div className="flex justify-center rounded-2xl border border-border px-4 py-6">
          <NotFoundBear
            subtitle={
              <>
                It looks like there are no assets to supply right now. <br />
                When you have eligible assets available, they will appear in
                this section.
              </>
            }
          />
        </div>
      )}
    </>
  );
}
