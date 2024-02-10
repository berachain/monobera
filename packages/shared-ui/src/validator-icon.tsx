"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { get } from "@/libs/http";
import { useValidators } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import useSWRImmutable from "swr/immutable";
import { useLocalStorage } from "usehooks-ts";
import { type Address } from "viem";

export const ValidatorIcon = ({
  address,
  className,
  validator,
}: {
  address: Address;
  className?: string;
  validator?: any;
}) => {
  const [validatorImg, setValidatorImg] = useState<string>("");
  const [validatorIcon, setValidatorIcon] = useLocalStorage(
    `VALIDATOR_ICON-${address}`,
    "",
  );
  const get = async (url: string) => {
    return (
      await fetch(url, { referrerPolicy: "origin-when-cross-origin" })
    ).json();
  };

  // const validatorInfo = useValidators();
  // const validatorImg = validatorInfo?.validatorDictionary
  //   ? validatorInfo?.validatorDictionary[address]?.logoURI
  //   : "";

  const keybase = async (identity: string) => {
    return get(
      `https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`,
    );
  };

  const { data } = useSWRImmutable([address], () => {
    keybase(address)
      .then((d) => {
        if (Array.isArray(d.them)) {
          const uri = String(d.them[0]?.pictures?.primary?.url).replace(
            "https://s3.amazonaws.com/keybase_processed_uploads/",
            "",
          );
          console.log("uriiiii", uri);
          return uri;
        } else throw new Error(`failed to fetch avatar for ${address}.`);
      })
      .catch((error) => {
        console.error(error); // uncomment this if you want the user to see if the avatar failed to load.
      });
  });

  const fetchAvatar = (identity: string) => {
    // fetch avatar from keybase
    return new Promise<void>((resolve) => {
      keybase(identity)
        .then((d) => {
          if (Array.isArray(d.them)) {
            const uri = String(d.them[0]?.pictures?.primary?.url).replace(
              "https://s3.amazonaws.com/keybase_processed_uploads/",
              "",
            );
            setValidatorImg(uri);
            resolve();
          } else throw new Error(`failed to fetch avatar for ${identity}.`);
        })
        .catch((error) => {
          console.error(error); // uncomment this if you want the user to see if the avatar failed to load.
          resolve();
        });
    });
  };
  useEffect(() => {
    if (address) {
      console.log("fetching avatar for", validatorIcon, validatorImg);
      fetchAvatar(address).then(() => {
        setValidatorIcon(validatorImg);
      });
    }
  }, [address]);

  return (
    <Avatar className={cn("", className)}>
      <AvatarImage src={`${process.env.NEXT_PUBLIC_AWS_URL}/${validatorImg}`} />
      <AvatarFallback>
        <Image
          src={`${process.env.NEXT_PUBLIC_AWS_URL}/${validatorImg}`}
          width={100}
          height={100}
          className="h-full w-full rounded-full border border-border p-1"
          alt={"validator-icon"}
        />
      </AvatarFallback>
    </Avatar>
  );
};
