"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";

export const VaultIcon = ({
  imageUri,
  className,
}: {
  imageUri: string | undefined;
  className?: string;
}) => {
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
