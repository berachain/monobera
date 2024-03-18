"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { type Address } from "viem";

export const ValidatorIcon = ({
  address,
  validatorIndex,
  description,
  className,
}: {
  address?: Address;
  validatorIndex?: number;
  description?: string;
  className?: string;
}) => {
  return (
    <Avatar className={cn("", className)}>
      {/* {validatorImg && (
        <AvatarImage
          src={`${process.env.NEXT_PUBLIC_AWS_URL}/${validatorImg}`}
        />
      )} */}
      <AvatarFallback>
        <Image
          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/shared/wx4snihxcxxdko2wpsbj`}
          width={100}
          height={100}
          className="h-full w-full rounded-full border border-border p-1"
          alt={"validator-icon"}
        />
      </AvatarFallback>
    </Avatar>
  );
};
