"use client";

import { useMemo } from "react";
import { useTokens, type Token } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { getAddress } from "viem";

const IconVariants = cva(
  "aspect-square flex items-center justify-center rounded-full text-foreground",
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

export interface IconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof IconVariants> {
  token?: Token | undefined;
  fetch?: boolean;
  address?: string;
}

export const TokenIcon = ({
  token,
  // fetch = false,
  address,
  className,
  size,
  ...props
}: IconProps) => {
  const { tokenDictionary } = useTokens();

  const img = useMemo(() => {
    if (tokenDictionary && (address || token)) {
      if (address && address !== "") {
        return tokenDictionary[getAddress(address)]?.logoURI;
      } else if (token && token?.address !== "") {
        return tokenDictionary[getAddress(token.address)]?.logoURI;
      }
    }
    return "";
  }, [token, address, tokenDictionary]);

  return (
    <Avatar className={cn(IconVariants({ size }), className)} {...props}>
      <AvatarImage
        src={img}
        className="rounded-full"
        alt={token?.symbol ?? "unknow"}
      />
      <AvatarFallback className="h-full w-full border border-foreground bg-background text-inherit">
        TKN
      </AvatarFallback>
    </Avatar>
  );
};
