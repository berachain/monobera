import { FormattedNumber } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import BigNumber from "bignumber.js";

export const QuorumStatus = ({
  delegatesVotesCount,
  quorum,
}: {
  delegatesVotesCount: string;
  quorum: string;
}) => {
  const percentage = BigNumber(delegatesVotesCount)
    .div(BigNumber(quorum))
    .times(100)
    .toNumber();

  return (
    <div className="grid grid-cols-1 md:flex items-center md:h-4 gap-2 font-medium">
      <div className="whitespace-nowrap leading-none">
        <FormattedNumber value={delegatesVotesCount} visibleDecimals={1} /> of{" "}
        <FormattedNumber value={quorum} visibleDecimals={1} />
      </div>
      <div>
        {percentage >= 100 ? (
          <div className="flex items-center gap-1 leading-none font-medium text-success-foreground">
            Reached <Icons.checkCircle className="h-4 w-4" />
          </div>
        ) : (
          <div className="text-muted-foreground leading-none whitespace-nowrap">
            (
            <FormattedNumber
              value={percentage}
              visibleDecimals={0}
              percent={true}
              showIsSmallerThanMin
            />
            )
          </div>
        )}
      </div>
    </div>
  );
};
