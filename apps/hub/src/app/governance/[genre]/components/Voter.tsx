import { truncateHash, type Voter } from "@bera/berajs";
import { Identicon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { useEnsName, useEnsAvatar } from "wagmi";
import { normalize } from "viem/ens";

import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Address, getAddress, isAddress } from "viem";

export const VoteInfo = ({
  voter,
  prefix,
  className = "font-medium text-sm",
}: { prefix?: string; className?: string; voter: string }) => {
  const { data: ens } = useEnsName({
    address: voter as Address,
  });

  const avatar = useEnsAvatar({
    name: normalize(ens ?? ""),
  });

  return (
    <div className={cn("flex items-center gap-2 ", className)}>
      <Avatar className="h-6 w-6">
        <AvatarImage src={avatar.data ?? ""} alt={voter} />
        <AvatarFallback>
          <Identicon account={ens ?? voter} />
        </AvatarFallback>
      </Avatar>
      <div className="cursor-pointer  hover:underline">
        {prefix}
        {truncateHash(voter, 6, 4)}
      </div>
    </div>
  );
};
