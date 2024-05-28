import { Address } from "viem";
import { useTokens } from "@bera/berajs";
import { TokenIconList } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";

export const GaugeHeaderWidget = ({
  gauge,
  className,
}: {
  gauge: Address;
  className?: string;
}) => {
  const { data } = useTokens();
  const tokenList = data?.tokenList ?? [];
  let list: any = [];
  if (tokenList[0] && tokenList[1]) {
    list = [tokenList[0], tokenList[1]];
  }
  return (
    <div
      className={cn(
        "flex flex-col gap-2 whitespace-nowrap text-left",
        className,
      )}
    >
      <div className="flex items-center gap-1 text-lg font-medium leading-6">
        <Icons.bexFav className="h-6 w-6" />
        BEX
      </div>
      <div className="flex items-center gap-1 text-xs leading-5">
        <TokenIconList tokenList={list} size="md" />
        HONEY / bHONEY
      </div>
    </div>
  );
};
