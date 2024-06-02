import { usePollGauges, useTokens } from "@bera/berajs";
import { GaugeIcon, TokenIconList } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Address } from "viem";

export const GaugeHeaderWidget = ({
  address,
  className,
}: {
  address: Address;
  className?: string;
}) => {
  const { gaugeDictionary, isLoading, isValidating } = usePollGauges();
  const gauge = gaugeDictionary?.[address];

  const { data } = useTokens();
  const tokenList = data?.tokenList ?? [];
  let list: any = [];
  if (tokenList[0] && tokenList[1]) {
    list = [tokenList[0], tokenList[1]];
  }
  return (
    <>
      {isLoading || !gauge ? (
        <div>Loading</div>
      ) : (
        <div
          className={cn(
            "flex flex-col gap-2 whitespace-nowrap text-left",
            className,
          )}
        >
          <div className="flex items-center gap-1 text-md font-medium leading-6">
            <GaugeIcon address={address} />
            {gauge.metadata.product}
          </div>
          <div className="flex items-center gap-1 text-xs leading-5">
            <TokenIconList tokenList={list} size="md" />
            {gauge.metadata.name}
          </div>
        </div>
      )}
    </>
  );
};
