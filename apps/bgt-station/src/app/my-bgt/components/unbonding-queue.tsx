import React from "react";
import { Calendar } from "@bera/ui/calendar";
import { Card } from "@bera/ui/card";

import { unbonding_queue_columns } from "~/columns/global-gauge-weight";
import "react-datepicker/dist/react-datepicker.css";
import {
  STAKING_PRECOMPILE_ABI,
  TransactionActionType,
  truncateHash,
  useBeraConfig,
  usePollDelegatorUnbonding,
  type EntryData,
} from "@bera/berajs";
import { cloudinaryUrl, docsUrl } from "@bera/config";
import { DataTable, ValidatorIcon, useTxn } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { mutate } from "swr";
import { type Address } from "wagmi";

import { Banner } from "./banner";

export default function UnbondingQueue({
  unbondingQueue,
}: {
  unbondingQueue: EntryData[];
}) {
  const { useDelegatorTotalUnbonding, QUERY_KEY } = usePollDelegatorUnbonding();
  const total = useDelegatorTotalUnbonding();
  const { networkConfig } = useBeraConfig();
  const { write, ModalPortal } = useTxn({
    actionType: TransactionActionType.CANCEL_UNBONDING,
    message: `Cancel Unbonding`,
    onSuccess: () => {
      void mutate(QUERY_KEY);
    },
  });

  const dateArray: Date[] = Object.values(unbondingQueue ?? [])
    ?.map((unbondingInfo: any) => new Date(unbondingInfo.completionTime))
    .sort((a: Date, b: Date) => a.getTime() - b.getTime());

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
      hide: (
        <div
          className="flex w-full items-center justify-center"
          onClick={() => {
            write({
              address: networkConfig.precompileAddresses
                .stakingAddress as Address,
              abi: STAKING_PRECOMPILE_ABI,
              functionName: "cancelUnbondingDelegation",
              params: [
                queue.validatorAddress,
                queue.balance,
                queue.creationHeight,
              ],
            });
          }}
        >
          <Icons.close className="h-4 w-4 self-center rounded-sm border border-border text-secondary-foreground" />
        </div>
      ),
    }));
  }, [unbondingQueue]);

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
          <div className="w-full">
            <DataTable
              columns={unbonding_queue_columns}
              data={dataT}
              // emptyMessage="No BGT unbonding queue"
              className="min-w-[490px]"
            />
          </div>
        </>
      ) : (
        <Banner
          img={`${cloudinaryUrl}/bears/zkyxcj5qhdmd75xgozkn`}
          title="How do I unbond BGT?"
          subtitle="Unbond with ease following our walkthrough."
          href={`${docsUrl}/proof-of-liquidity/pol-bgt-emissions.html`}
        />
      )}
    </div>
  );
}
