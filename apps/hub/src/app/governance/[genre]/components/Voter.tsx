import { truncateHash, type Voter } from "@bera/berajs";
import Identicon from "@bera/shared-ui/src/identicon";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { getAddress } from "viem";

export const VoteInfo = ({ voter }: { voter: Voter }) => {
  return (
    <div className="flex items-end gap-2 text-sm">
      <Avatar className="h-6 w-6">
        <AvatarImage src={voter.picture ?? ""} alt={voter.name} />
        <AvatarFallback>
          <Identicon account={getAddress(voter.address)} />
        </AvatarFallback>
      </Avatar>
      <div className="cursor-pointer font-medium hover:underline">
        {voter.name ? voter.name : truncateHash(voter.address, 6, 4)}
      </div>
    </div>
  );
};
