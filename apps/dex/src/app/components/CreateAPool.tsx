"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";

import { CircleBackground } from "~/components/CirceBackground";

export default function CreateAPool() {
  const router = useRouter();

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
          <div className="m-auto max-w-[400px]">
            <Image
              src="/create-a-pool-new.png"
              alt="Create a pool screenshot"
              width={561}
              height={889}
            />
          </div>
          <Button
            className="mt-8"
            variant="outline"
            onClick={() => router.push(`/pool/create`)}
          >
            Create a Pool
          </Button>
        </div>
      </div>
    </section>
  );
}
