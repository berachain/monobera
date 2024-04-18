"use client";

import React from "react";
import Image from "next/image";
import { useValidatorIcon } from "@bera/berajs";
import { awsUrl, cloudinaryUrl } from "@bera/config";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { type Address } from "viem";

export const ValidatorIcon = ({
  address,
  description,
  className,
}: {
  address: Address;
  description?: string;
  className?: string;
}) => {
  const { data: validatorImg } = useValidatorIcon({
    identity: description,
    address,
  });

  return (
    <Avatar className={cn("", className)}>
      {validatorImg && <AvatarImage src={`${awsUrl}/${validatorImg}`} />}
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
