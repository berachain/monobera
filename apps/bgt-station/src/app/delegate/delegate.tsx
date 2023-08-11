"use client";

import { useRouter } from "next/navigation";
import { Card } from "@bera/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { DelegateEnum, type DelegateEnum as DelegateEnumT } from "./types";

export default function Delegate({ action }: { action: DelegateEnumT }) {
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
        <div className="text-lg font-semibold leading-7 text-foreground">
          Unbond
        </div>
      </Card>
    </div>
  );
}
