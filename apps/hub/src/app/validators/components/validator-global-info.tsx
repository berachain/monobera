import Image from "next/image";
import { usePollGlobalData } from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import { FormattedNumber } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Skeleton } from "@bera/ui/skeleton";

export const ValidatorGlobalInfo = () => {
  const { data, isLoading } = usePollGlobalData();
  const generalInfo = [
    {
      amount: (
        <FormattedNumber
          value={data?.validatorCount ?? 0}
          compact={false}
          visibleDecimals={0}
        />
      ),
      text: "Total Validators",
      img: (
        <div className="absolute bottom-0 right-0">
          <Image
            src={`${cloudinaryUrl}/station/validators`}
            alt="Total Validators"
            width={140}
            height={140}
          />
        </div>
      ),
    },
    {
      amount: (
        <FormattedNumber
          value={data?.sumAllIncentivesInHoney ?? 0}
          symbol="USD"
        />
      ),
      text: "Total Active Incentives",
      img: (
        <div className="absolute bottom-0 right-0">
          <Image
            src={`${cloudinaryUrl}/station/incentives`}
            alt="Validator Incentives"
            width={100}
            height={100}
          />
        </div>
      ),
    },
    {
      amount: (
        <FormattedNumber
          value={data?.bgtInfo?.bgtInflation ?? 0}
          symbol="BGT"
          showIsSmallerThanMin
        />
      ),
      text: "BGT Inflation per year",
      img: (
        <div className="absolute bottom-0 right-0">
          <Image
            src={`${cloudinaryUrl}/station/inflation`}
            alt="Inflation"
            width={80}
            height={80}
          />
        </div>
      ),
    },
    {
      amount: (
        <FormattedNumber
          value={data?.vaultCount ?? 0}
          compact={false}
          visibleDecimals={0}
        />
      ),
      text: "Active gauges",
      img: (
        <div className="absolute bottom-0 right-0">
          <Image
            src={`${cloudinaryUrl}/station/active-gauges`}
            alt="Active Gauges"
            width={100}
            height={100}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {generalInfo.map((info, index) => (
        <Card
          className="relative h-[150px] border-border p-6 text-left"
          key={info.text + index}
        >
          <div className="text-xs font-medium leading-[14px] text-muted-foreground">
            {info.text}
          </div>
          {isLoading ? (
            <Skeleton className="mt-4 h-[45px] w-[120px]" />
          ) : (
            <div className="mt-4 text-2xl font-semibold leading-loose text-foreground">
              {info.amount}
            </div>
          )}
          {info.img}
        </Card>
      ))}
    </div>
  );
};
