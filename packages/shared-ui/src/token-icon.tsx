"use client";

import { useMemo } from "react";
import { useTokenInformation, useTokens, type Token } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { getAddress } from "viem";

type Props = {
  token?: Token | undefined;
  fetch?: boolean;
  className?: string;
  size?: number;
  address?: string;
};

export const TokenIcon = ({
  token,
  className,
  fetch = false,
  size = 32,
  address,
}: Props) => {
  const { read, tokenInformation } = useTokenInformation();

  const { tokenDictionary } = useTokens();
  useMemo(() => {
    const fetchData = async () => {
      if (fetch && address && !tokenInformation) {
        await read({ address: address });
      }
    };

    void fetchData();
  }, [token]);

  const getTokenImgUri = () => {
    if (token && token.logoURI) {
      return token.logoURI;
    }
    if (token && token.logoURI === undefined && tokenDictionary) {
      return tokenDictionary[getAddress(token.address)]?.logoURI;
    }
    if (fetch && address) {
      if (tokenDictionary && tokenDictionary[address]) {
        return tokenDictionary[address]?.logoURI;
      } else {
        return "";
      }
    }
    return "";
  };

  return (
    <Avatar
      className={cn(
        "flex aspect-square h-8 w-8 items-center justify-center rounded-full",
        `h-[${size}px] w-[${size}px]`,
        className,
      )}
    >
      <AvatarImage src={getTokenImgUri()} className="rounded-full" />
      <AvatarFallback
        className={cn(
          "h-full w-full border border-foreground bg-background font-bold text-foreground",
          `text-[${8 + (size - 24) / 4}px]`,
        )}
      >
        {fetch
          ? tokenInformation?.symbol?.slice(0, 3).toUpperCase()
          : token?.symbol?.slice(0, 3).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
