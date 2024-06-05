"use client";

import { useMemo } from "react";
import { usePollGauges } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Icons } from "@bera/ui/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { Address } from "viem";

const IconVariants = cva(
  "aspect-square flex items-center justify-center rounded-full text-foreground bg-background border border-border",
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
  address?: Address;
  overrideImage?: string;
}

export const GaugeIcon = ({
  address = "0x",
  overrideImage,
  className,
  size,
  ...props
}: IconProps) => {
  const { gaugeDictionary } = usePollGauges();
  const img = useMemo(
    () => gaugeDictionary?.[address]?.metadata.logoURI,
    [address],
  );
  return (
    <Avatar className={cn(IconVariants({ size }), className)} {...props}>
      <AvatarImage
        src={overrideImage ? overrideImage : img}
        className="rounded-full"
        alt={address}
      />
      <AvatarFallback>
        <Icons.gauge className="p-1" />
      </AvatarFallback>
    </Avatar>
  );
};
