import { truncateHash, usePollGauges, useTokens } from "@bera/berajs";
import { GaugeIcon, MarketIcon, TokenIconList } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Address } from "viem";

export const GaugeHeaderWidget = ({
  address,
  className,
}: {
  address: Address;
  className?: string;
}) => {
  const { gaugeDictionary, isLoading } = usePollGauges();
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
          <div className="text-md flex items-center gap-1 font-medium leading-6">
            <GaugeIcon address={gauge.id} />
            {gauge.metadata?.name ?? truncateHash(gauge.id)}
          </div>
          <div className="flex items-center gap-1 text-sm font-medium leading-5 ml-2">
            <MarketIcon market={gauge.metadata?.product ?? "OTHER"} size="md" />
            {gauge.metadata?.product ?? "OTHER"}
          </div>
        </div>
      )}
    </>
  );
};
