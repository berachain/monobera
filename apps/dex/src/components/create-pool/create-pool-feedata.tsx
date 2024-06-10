"use client";

import React from "react";
import { ActionButton } from "@bera/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { POOLID } from "~/hooks/useCreateTokenWeights";

type Props = {
  poolId: POOLID;
  error: Error | undefined;
  setPoolId: (poolId: POOLID) => void;
  onContinue: () => void;
  onBack: () => void;
};

export function CreatePoolFeeData({
  poolId,
  error,
  setPoolId,
  onContinue,
  onBack,
}: Props) {
  return (
    <Card className="w-[350px]  px-6 py-8 shadow-lg  sm:w-[480px]">
      <CardTitle className="center text-md mb-3 flex items-center p-0 font-semibold sm:text-lg">
        <Icons.chevronLeft
          className="block h-6 w-6 hover:cursor-pointer"
          onClick={onBack}
        />
        Set pool fees
      </CardTitle>
      <div className="flex flex-col gap-4">
        <Tabs
          defaultValue={poolId}
          onValueChange={(value: string) => {
            setPoolId(value as any);
          }}
        >
          <TabsList className="w-full">
            <TabsTrigger value={POOLID.FIVE_BPS} className="w-full ">
              0.05%
            </TabsTrigger>
            <TabsTrigger value={POOLID.THIRTY_BPS} className="w-full ">
              0.30%
            </TabsTrigger>
            <TabsTrigger
              value={POOLID.HUNDRED_BPS}
              className="w-full  min-w-[30px]"
            >
              1%
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <p className="text-sm font-medium text-muted-foreground">
          0.05% and 0.30% are recommended for stable pairings
        </p>
        <Alert variant="info">
          <AlertDescription>
            Additional fee of 0.10% will be added to each pool to be redirected
            to BGT stakers
          </AlertDescription>
        </Alert>
        {error && (
          <Alert variant="destructive" className="my-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error?.message}</AlertDescription>
          </Alert>
        )}
        <ActionButton>
          <Button
            className="w-full"
            onClick={onContinue}
            disabled={error !== undefined}
          >
            Next
          </Button>
        </ActionButton>
      </div>
    </Card>
  );
}
