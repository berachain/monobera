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
    <div className="sm:flex sm:h-4 sm:w-[170px] gap-2 font-medium">
      <div className="whitespace-nowrap">
        <FormattedNumber value={delegatesVotesCount} visibleDecimals={1} /> of{" "}
        <FormattedNumber value={quorum} visibleDecimals={1} />
      </div>
      <div>
        {percentage >= 100 ? (
          <div className="flex items-center gap-1 font-medium text-success-foreground">
            Reached <Icons.checkCircle className="h-4 w-4" />
          </div>
        ) : (
          <div>
            (
            <FormattedNumber
              className="text-muted-foreground"
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
