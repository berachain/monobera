"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useBeraJs, useUserValidators } from "@bera/berajs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { type Address } from "viem";

import { BoostQueue } from "../validators/components/boost-queue";
import { DelegateContent } from "./delegate-content";
import { DelegateEnum } from "./types";
import { UnDelegateContent } from "./undelegate-content";

export default function Delegate({
  action = DelegateEnum.DELEGATE,
  validator,
}: {
  action: DelegateEnum;
  validator: Address;
}) {
  const { isReady } = useBeraJs();
  const router = useRouter();
  const { data } = useUserValidators();

  return (
    <div className="mx-auto flex w-full max-w-[600px] flex-col gap-6 sm:container sm:px-0 md:px-8 lg:w-[600px]">
      <Tabs defaultValue={action}>
        <TabsList className="w-full">
          <TabsTrigger
            value={DelegateEnum.DELEGATE}
            key={DelegateEnum.DELEGATE}
            className="flex-1 capitalize"
            onClick={() =>
              router.push(
                validator
                  ? `/delegate?action=${DelegateEnum.DELEGATE}&validator=${validator}`
                  : `/delegate?action=${DelegateEnum.DELEGATE}`,
              )
            }
          >
            {DelegateEnum.DELEGATE}
          </TabsTrigger>
          <TabsTrigger
            value={DelegateEnum.UNBOND}
            key={DelegateEnum.UNBOND}
            disabled={!isReady}
            className="flex-1 capitalize"
            onClick={() =>
              router.push(
                validator
                  ? `/delegate?action=${DelegateEnum.UNBOND}&validator=${validator}`
                  : `/delegate?action=${DelegateEnum.UNBOND}`,
              )
            }
          >
            {DelegateEnum.UNBOND}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={DelegateEnum.DELEGATE}>
          <DelegateContent validator={validator} />
        </TabsContent>
        <TabsContent value={DelegateEnum.UNBOND}>
          <UnDelegateContent validator={validator} />
        </TabsContent>
      </Tabs>
      {data && (
        <>
          <hr />
          <BoostQueue />
        </>
      )}
    </div>
  );
}
