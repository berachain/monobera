import React from "react";
import { Calendar } from "@bera/ui/calendar";
import { Card } from "@bera/ui/card";

import { unbonding_queue_columns } from "~/columns/global-gauge-weight";
import "react-datepicker/dist/react-datepicker.css";
import {
  STAKING_PRECOMPILE_ABI,
  formatter,
  truncateHash,
  useBeraConfig,
  usePollDelegatorUnbonding,
  type EntryData,
} from "@bera/berajs";
import { useTxn } from "@bera/shared-ui";
import { ValidatorIcon } from "@bera/shared-ui/src/validator-icon";
import { Icons } from "@bera/ui/icons";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import RT from "~/components/react-table";
import Nothing from "../nothing";

export default function UnbondingQueue({
  unbondingQueue,
}: {
  unbondingQueue: EntryData[];
}) {
  const { useDelegatorTotalUnbonding } = usePollDelegatorUnbonding();
  const total = useDelegatorTotalUnbonding();
  const { networkConfig } = useBeraConfig();
  const { write, ModalPortal } = useTxn({
    message: `Cancel Unbonding`,
  });

  const dateArray: Date[] = Object.values(unbondingQueue ?? [])?.map(
    (unbondingInfo: any) => new Date(unbondingInfo.completionTime),
  );

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
      unbondingAmount: (
        <div className="flex h-full w-[100px] items-center justify-center">
          {formatter.format(Number(formatUnits(queue.balance, 18)))}
        </div>
      ),
      timeRemaining: (
        <div className="flex h-full w-[120px] flex-row items-center justify-center">
          {getDateString(queue.completionTime)}
        </div>
      ),
      hide: (
        <div
          className=" flex w-[27px] items-center justify-center"
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
          <Icons.close className="relative h-4 w-4 rounded-sm border border-border text-secondary" />
        </div>
      ),
    }));
  }, [unbondingQueue]);
  return (
    <div className="mt-8 flex w-full flex-col gap-8 md:flex-row ">
      {total !== 0 ? (
        <>
          {ModalPortal}
          <Card className="h-fit w-fit p-6">
            <Calendar
              mode="multiple"
              selected={dateArray}
              defaultMonth={dateArray[0]}
            />
          </Card>
          <div className="w-full ">
            <RT
              columns={unbonding_queue_columns}
              data={dataT}
              className="min-w-[490px]"
              emptyMessage="No BGT unbonding queue"
            />
          </div>
        </>
      ) : (
        <Nothing message="This section will be populated once you have unbonded BGT from validators. " />
      )}
    </div>
  );
}
