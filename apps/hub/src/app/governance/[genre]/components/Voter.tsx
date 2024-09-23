import { truncateHash, type Voter } from "@bera/berajs";
import Identicon from "@bera/shared-ui/src/identicon";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { getAddress, isAddress } from "viem";

export const VoteInfo = ({
  voter,
  prefix,
  className = "font-medium text-sm",
}: { prefix?: string; className?: string; voter: Voter }) => {
  return (
    <div className={cn("flex items-center gap-2 ", className)}>
      <Avatar className="h-6 w-6">
        <AvatarImage src={voter.picture ?? ""} alt={voter.name} />
        <AvatarFallback>
          <Identicon account={getAddress(voter.address)} />
        </AvatarFallback>
      </Avatar>
      <div className="cursor-pointer  hover:underline">
        {prefix}
        {voter.name && !isAddress(voter.name)
          ? voter.name
          : truncateHash(voter.address, 6, 4)}
      </div>
    </div>
  );
};
