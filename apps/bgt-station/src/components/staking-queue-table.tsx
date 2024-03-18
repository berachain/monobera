import React from "react";

import "react-datepicker/dist/react-datepicker.css";
import { truncateHash, type EntryData } from "@bera/berajs";
import { DataTable, ValidatorIcon } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { type Address } from "viem";

import { unstake_queue_columns } from "~/columns/unstake-queue-columns";

export default function StakingQueueTable({
  unbondingQueue,
}: {
  unbondingQueue: EntryData[];
}) {
  const getDateString = (dateString: string) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = date.toLocaleString(undefined, options as any);
    return formattedDate;
  };

  const customEmptyDataState = () => {
    return (
      <div className="m-6 flex flex-col items-center justify-center gap-4">
        <Icons.calendarClock className="h-[52px] w-[52px] text-muted-foreground" />
        <div className="flex text-center text-lg font-semibold text-foreground">
          No Staking Requests
        </div>
        <div className="font-subtle flex text-sm text-muted-foreground">
          You don’t have any active staking requests, they’ll appear here when
          there are active withdrawals in the queue
        </div>
      </div>
    );
  };

  const dataT = React.useMemo(() => {
    return unbondingQueue
      ? unbondingQueue.map((queue: EntryData) => ({
          validator: (
            <div className="flex h-full w-[129px] items-center gap-1">
              <ValidatorIcon
                address={queue.validatorAddress as Address}
                className="h-6 w-6"
              />
              {truncateHash(queue.validatorAddress as Address)}
            </div>
          ),
          unbondingAmount: queue.balance,
          timeRemaining: getDateString(queue.completionTime),
        }))
      : [];
  }, [unbondingQueue]);

  return (
    <div className="flex w-full flex-col gap-8 md:flex-row ">
      <>
        <div className="w-full">
          <DataTable
            columns={unstake_queue_columns}
            data={dataT}
            className="min-w-[490px]"
            customEmptyDataState={customEmptyDataState()}
          />
        </div>
      </>
    </div>
  );
}
