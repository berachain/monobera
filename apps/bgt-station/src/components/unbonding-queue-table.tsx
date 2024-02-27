import React from "react";

import "react-datepicker/dist/react-datepicker.css";
import { truncateHash, type EntryData } from "@bera/berajs";
import { DataTable, ValidatorIcon } from "@bera/shared-ui";
import { type Address } from "wagmi";

import { unstake_queue_columns } from "~/columns/unstake-queue-columns";

export default function UnbondingQueueTable({
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

  const dataT = React.useMemo(() => {
    return unbondingQueue.map((queue: EntryData) => ({
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
    }));
  }, [unbondingQueue]);

  return (
    <div className="flex w-full flex-col gap-8 md:flex-row ">
      <>
        <div className="w-full">
          <DataTable
            columns={unstake_queue_columns}
            data={dataT}
            className="min-w-[490px]"
          />
        </div>
      </>
    </div>
  );
}
