import React from "react";
import { Calendar } from "@bera/ui/calendar";
import { Card } from "@bera/ui/card";

import { global_gauge_weight_columns } from "~/columns/global-gauge-weight";
import "react-datepicker/dist/react-datepicker.css";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Icons } from "@bera/ui/icons";
import RT from "~/components/react-table";

export default function UnbondingQueue({
  unbondingQueue,
}: {
  unbondingQueue: any;
}) {
  const mockData = [
    { label: "Red", amount: 12 },
    { label: "Blue", amount: 19 },
    { label: "Yellow", amount: 3 },
    { label: "Green", amount: 5 },
    { label: "Purple", amount: 2 },
  ];

  const dateArray: Date[] = Object.values(unbondingQueue ?? [])?.map(
    (unbondingInfo: any) => new Date(unbondingInfo.completionTime),
  );

  const dataT = React.useMemo(() => {
    return mockData.map((data) => ({
      poolOrAddress: (
        <div className="flex h-full w-[129px] items-center gap-1">
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{data.label}</AvatarFallback>
          </Avatar>
          {data.label}
        </div>
      ),
      bgtIncentive: (
        <div className="flex h-full w-[100px] items-center">69.12K (6.9%)</div>
      ),
      tvl: <div className="flex h-full w-[53px] items-center">69.42M%</div>,
      hide: (
        <div className=" flex w-[27px] justify-center">
          <Icons.close className="relative h-4 w-4 rounded-sm border border-border text-secondary" />
        </div>
      ),
    }));
  }, [mockData]);
  return (
    <div className="mt-8 flex w-full flex-col gap-8 md:flex-row ">
      <Card className="h-fit w-fit p-6">
        <Calendar mode="multiple" selected={dateArray} />
      </Card>
      <div className="w-full ">
        <RT
          columns={global_gauge_weight_columns}
          data={dataT}
          className="min-w-[490px]"
          emptyMessage="No BGT unbonding queue"
        />
      </div>
    </div>
  );
}
