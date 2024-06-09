"use client";

import Link from "next/link";
import { lendUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Card, CardContent } from "@bera/ui/card";

export const BgtStationBanner = () => {
  return (
    <Card>
      <CardContent className="flex w-full flex-row items-center justify-between p-4 pt-4">
        <div className="flex flex-col items-start pr-4">
          <div className="text-muted-foregorund font-medium">
            HONEY Debt tokens are non transferrable
          </div>
          <div className="text-sm text-muted-foreground">
            Rewards are directed directly to the BEND Pool. Users can claim BGT
            on BEND.
          </div>
        </div>
        <Link href={lendUrl} target="_blank">
          <Button variant={"outline"}>Go to Bend</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
