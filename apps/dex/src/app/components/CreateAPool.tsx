"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { CircleBackground } from "~/components/CirceBackground";
import { Button } from "@bera/ui/button";

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
          <h2 className=" mb-2 text-3xl font-semibold">
            Create <span className="text-muted-foreground">a Pool</span>
          </h2>
          <h3 className="mb-6 text-xl font-semibold text-muted-foreground">
            Create your own custom recipe
          </h3>
          <div className="m-auto max-w-[400px]">
            <Image
              src="/create-a-pool-new.png"
              alt="Create a pool screenshot"
              width={561}
              height={889}
            />
          </div>
          <Button variant='outline' className="bg-background"
                  onClick={() => router.push(`/pool/create`)}
                  >
          Create a Pool
        </Button>
        </div>
 
      </div>
      
    </section>
  );
}
