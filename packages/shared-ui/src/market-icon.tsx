"use client";

import React from "react";
import Image from "next/image";
import { usePollMarkets } from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { type Address } from "viem";

export const MarketIcon = ({
  market,
  className,
}: {
  market: string | undefined;
  className?: string;
}) => {
  const { data } = usePollMarkets();
  const imageUri = data?.find((m) => m.name === market)?.logoURI;
  return (
    <Avatar className={cn("", className)}>
      {imageUri && <AvatarImage src={imageUri} />}
      <AvatarFallback>
        <Image
          src={`${cloudinaryUrl}/shared/wx4snihxcxxdko2wpsbj`}
          width={100}
          height={100}
          className="h-full w-full rounded-full border border-border p-1"
          alt={"validator-icon"}
        />
      </AvatarFallback>
    </Avatar>
  );
};
