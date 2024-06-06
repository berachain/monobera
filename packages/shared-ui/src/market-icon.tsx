"use client";

import React from "react";
import Image from "next/image";
import { usePollMarkets } from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { VariantProps, cva } from "class-variance-authority";

const IconVariants = cva(
  "aspect-square flex items-center justify-center rounded-xs text-foreground",
  {
    variants: {
      size: {
        "3xl": "w-16 h-16 text-lg font-semibold leading-7",
        "2xl": "w-12 h-12 text-[14px] font-semibold leading-tight",
        xl: "w-8 h-8 text-xs font-normal leading-3",
        lg: "w-6 h-6 text-[8px]",
        md: "w-4 h-4 text-[6px]",
        sm: "w-3 h-3 text-[4px]",
        xs: "w-2 h-2 text-[3px]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

interface IconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof IconVariants> {
  market: string;
}

export const MarketIcon = ({
  size,
  market,
  className,
  ...props
}: IconProps) => {
  const { marketDictionary } = usePollMarkets();
  const imageUri = marketDictionary?.[market]?.logoURI;
  return (
    <Avatar className={cn(IconVariants({ size }), className)} {...props}>
      <AvatarImage src={imageUri} />
      <AvatarFallback>
        <Image
          src={`${cloudinaryUrl}/shared/wx4snihxcxxdko2wpsbj`}
          width={100}
          height={100}
          className="h-full w-full rounded-sm border border-border p-1"
          alt={"validator-icon"}
        />
      </AvatarFallback>
    </Avatar>
  );
};
