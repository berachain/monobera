"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { useTheme } from "next-themes";

import { CircleBackground } from "~/components/CirceBackground";
import { cloudinaryUrl } from "~/config";

export default function CreateAPool() {
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  return (
    <section className="my-24">
      <div className="relative m-auto h-[900px] bg-glow bg-cover bg-center bg-no-repeat">
        <div className="absolute left-[50%] top-0 z-10 translate-x-[-50%]">
          <CircleBackground color="#CA8A04" className="animate-spin-slower" />
        </div>
        <div className="absolute left-[50%] top-0 z-10 translate-x-[-50%]">
          <CircleBackground
            color="#FDE047"
            width={700}
            height={700}
            className="animate-spin-slower"
          />
        </div>
        <div className="absolute left-[50%] top-0 z-10 translate-x-[-50%]">
          <CircleBackground
            color="#E7E5E4"
            width={800}
            height={800}
            className="animate-spin-slower"
          />
        </div>
        <div className="relative z-20 pt-24 text-center">
          <h2 className=" mb-2 text-3xl font-semibold">Create a Pool</h2>
          <h3 className="mb-6 text-base font-semibold text-muted-foreground md:text-xl">
            Create your own custom recipe 🧾
          </h3>
          <div className="relative mx-auto w-full max-w-[1000px]">
            <Avatar
              className={
                "absolute bottom-[-40px] right-[180px] hidden h-[200px] w-[200px] animate-[bounce_4s_ease-in-out_infinite] lg:block"
              }
            >
              <AvatarImage
                src={`${cloudinaryUrl}/DEX/wh0ttwqb62vsyu2zchqb`}
                className="rounded-full"
              />
              <AvatarFallback>bera</AvatarFallback>
            </Avatar>

            <Avatar
              className={
                "absolute bottom-[150px] left-[100px] hidden h-28 w-28 animate-[bounce_5s_ease_infinite] lg:block"
              }
            >
              <AvatarImage
                src={`${cloudinaryUrl}/DEX/fuctjugvud3cpfe16wat`}
                className="rounded-full"
              />
              <AvatarFallback>honey</AvatarFallback>
            </Avatar>

            <Avatar
              className={
                "absolute bottom-20 right-0 hidden h-12 w-12 animate-[spin_10s_linear_infinite] blur-sm lg:block"
              }
            >
              <AvatarImage
                src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/btc.png"
                className="rounded-full"
              />
              <AvatarFallback>btc</AvatarFallback>
            </Avatar>

            <Avatar
              className={
                "absolute right-[200px] top-[100px] hidden h-16 w-16 animate-[spin_10s_linear_infinite] lg:block"
              }
            >
              <AvatarImage
                src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/eth.png"
                className="rounded-full"
              />
              <AvatarFallback>eth</AvatarFallback>
            </Avatar>

            <Avatar
              className={
                "absolute left-[200px] hidden h-16 w-16 animate-[bounce_10s_ease-in-out_infinite] lg:block"
              }
            >
              <AvatarImage
                src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/usdt.png"
                className="rounded-full"
              />
              <AvatarFallback>usdt</AvatarFallback>
            </Avatar>
            {(theme === "system" ? systemTheme : theme) === "light" ? (
              <Image
                className="mx-auto"
                src={`${cloudinaryUrl}/DEX/tj8udvfskyrcanuxfq47`}
                alt="Create a pool screenshot"
                width={400}
                height={889}
              />
            ) : (
              <Image
                className="mx-auto"
                src={`${cloudinaryUrl}/DEX/ebq1kd6ucdrultjqysnk`}
                alt="Create a pool screenshot"
                width={400}
                height={889}
              />
            )}
          </div>
        </div>
        <div className="mt-8 w-full text-center">
          <Button variant="outline" onClick={() => router.push(`/pool/create`)}>
            Create a Pool
          </Button>
        </div>
      </div>
    </section>
  );
}
