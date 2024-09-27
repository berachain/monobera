import { FormattedNumber } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { formatEther } from "viem";

export const QuorumStatus = ({
  delegatesVotesCount,
  quorum,
}: {
  delegatesVotesCount: bigint;
  quorum: bigint;
}) => {
  const percentage = Number((delegatesVotesCount * 100n) / quorum);
  return (
    <div className="grid grid-cols-1 items-center gap-2 font-medium md:flex md:h-4">
      <div className="whitespace-nowrap leading-none">
        <FormattedNumber
          value={formatEther(delegatesVotesCount)}
          visibleDecimals={1}
        />{" "}
        of <FormattedNumber value={formatEther(quorum)} visibleDecimals={1} />
      </div>
      <div>
        {percentage >= 100 ? (
          <div className="flex items-center gap-1 font-medium leading-none text-success-foreground">
            Reached <Icons.checkCircle className="h-4 w-4" />
          </div>
        ) : (
          <div className="whitespace-nowrap leading-none text-muted-foreground">
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
