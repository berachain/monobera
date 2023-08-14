"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { DelegateEnum, ImageMapEnum } from "./types";

export default function Delegate({ action }: { action: DelegateEnum }) {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-[500px]">
      <Tabs defaultValue={action}>
        <TabsList className="w-full">
          {Object.values(DelegateEnum).map((status) => (
            <TabsTrigger
              value={status}
              key={status}
              className="flex-1 capitalize"
              onClick={() => router.push(`/delegate?action=${status}`)}
            >
              {status.replaceAll("-", " ")}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Card className="mt-4 flex flex-col gap-3 p-6">
        <div className="text-lg font-semibold capitalize leading-7 text-foreground">
          {action}
        </div>
        <Image
          src={ImageMapEnum[action.toUpperCase() as keyof typeof ImageMapEnum]}
          alt="bera banner"
          width={452}
          height={175}
        />

        <div className="rounded-18 bg-muted p-3 text-muted-foreground">
          <div className="flex h-8 items-center justify-between">
            <div>Total</div>
            <div>0.0 BGT</div>
          </div>
          {action === "redelegate" && (
            <div className="flex h-8 items-center justify-between">
              <div>Cooldown</div>
              <div>21/10/2023</div>
            </div>
          )}
          {action === "unbond" && (
            <div className="flex h-8 items-center justify-between">
              <div>Unbonding date</div>
              <div>21/10/2023</div>
            </div>
          )}
        </div>

        <Button>Confirm</Button>
      </Card>
    </div>
  );
}
