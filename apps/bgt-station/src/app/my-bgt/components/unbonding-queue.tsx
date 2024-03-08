import React from "react";
import { Calendar } from "@bera/ui/calendar";
import { Card } from "@bera/ui/card";

import "react-datepicker/dist/react-datepicker.css";
import {
  TransactionActionType,
  usePollDelegatorUnbonding,
  type EntryData,
} from "@bera/berajs";
import { cloudinaryUrl, docsUrl } from "@bera/config";
import { useTxn } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { mutate } from "swr";

import UnbondingQueueTable from "~/components/unbonding-queue-table";
import { Banner } from "./banner";

export default function UnbondingQueue({
  unbondingQueue,
}: {
  unbondingQueue: EntryData[];
}) {
  const { useDelegatorTotalUnbonding, QUERY_KEY } = usePollDelegatorUnbonding();
  const total = useDelegatorTotalUnbonding();
  const { ModalPortal } = useTxn({
    actionType: TransactionActionType.CANCEL_UNBONDING,
    message: "Cancel Unbonding",
    onSuccess: () => {
      void mutate(QUERY_KEY);
    },
  });

  const dateArray: Date[] = Object.values(unbondingQueue ?? [])
    ?.map((unbondingInfo: any) => new Date(unbondingInfo.completionTime))
    .sort((a: Date, b: Date) => a.getTime() - b.getTime());

  const [currentMonth, setCurrentMonth] = React.useState(dateArray[0]);
  const disableLeft =
    currentMonth?.getMonth() === dateArray[0]?.getMonth() &&
    currentMonth?.getFullYear() === dateArray[0]?.getFullYear();
  return (
    <div className="flex w-full flex-col gap-8 md:flex-row ">
      {total !== 0 ? (
        <>
          {ModalPortal}
          <Card className="h-fit w-fit p-6">
            <Calendar
              mode="multiple"
              selected={dateArray}
              month={currentMonth}
              onMonthChange={(month: Date) => setCurrentMonth(month)}
              classNames={{
                nav_button_previous: cn(
                  "absolute left-1",
                  disableLeft &&
                    "cursor-not-allowed hidden pointer-events-none",
                ),
              }}
            />
          </Card>
          <UnbondingQueueTable unbondingQueue={unbondingQueue} />
        </>
      ) : (
        <Banner
          img={`${cloudinaryUrl}/bears/zkyxcj5qhdmd75xgozkn`}
          title="How do I unbond BGT?"
          subtitle="Unbond with ease following our walkthrough."
          href={`${docsUrl}/learn/protocol/bgt-station#unbonding-bgt`}
        />
      )}
    </div>
  );
}
