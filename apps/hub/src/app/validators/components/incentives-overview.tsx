import { type Token } from "@bera/berajs";
import { FormattedNumber, TokenIcon } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

export const IncentivesOverview = ({
  totalActiveIncentiveValue,
  totalActiveIncentives,
  featuredTokens,
  isLoading,
}: {
  totalActiveIncentiveValue: number;
  totalActiveIncentives: number;
  featuredTokens: Token[];
  isLoading: boolean;
}) => {
  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-[35px] w-[75px]" />
      ) : (
        <div className="inline-flex h-7 items-end gap-1">
          <span className="text-2xl font-semibold leading-6">
            <FormattedNumber
              value={totalActiveIncentiveValue}
              symbol="USD"
              compact
            />{" "}
            <span className="text-sm text-muted-foreground">
              ({totalActiveIncentives} Incentives)
            </span>
          </span>
        </div>
      )}
      {isLoading ? (
        <Skeleton className="mt-1 h-[25px] w-[100px]" />
      ) : (
        <div className="mt-1 flex w-fit items-center gap-1 rounded-full border border-border bg-background p-1 ">
          {featuredTokens.map((token, index) => (
            <TokenIcon
              key={index}
              address={token.address}
              className="h-6 w-6"
            />
          ))}
          {featuredTokens.length > 3 && (
            <span className="text-sm leading-5 text-muted-foreground">
              {" "}
              +{featuredTokens.length - 3}
            </span>
          )}
          {/* {featuredIncentiveTokenImages.map((gauge, index) => (
              <Image
                src={gauge}
                alt={`featuredGauge-${index}`}
                height={16}
                width={16}
                objectFit="contain"
              />
            ))}
            <span className="text-sm leading-5 text-muted-foreground">
              {" "}
              +{totalActiveIncentives - featuredIncentiveTokenImages.length}
            </span> */}
        </div>
      )}
    </div>
  );
};
