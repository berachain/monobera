import Link from "next/link";
import { truncateHash, type Token } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { type Address } from "wagmi";

import { AddToWalletBtn } from "./add-to-wallet-btn";

export function TokenList({ token }: { token: Token }) {
  return (
    <div className="flex h-7 items-center gap-2 ">
      <div className="text-sm font-medium ">{token.symbol}:</div>
      <Link
        className="hidden h-6 cursor-pointer items-center px-2 text-xs font-medium text-muted-foreground hover:bg-muted sm:flex"
        href={`${blockExplorerUrl}/address/${token.address}`}
        target="_blank"
      >
        {token.address}
      </Link>
      <Link
        className="flex h-6 cursor-pointer items-center px-2 text-xs font-medium text-muted-foreground hover:bg-muted sm:hidden"
        href={`${blockExplorerUrl}/address/${token.address}`}
        target="_blank"
      >
        {truncateHash(token.address)}
      </Link>
      <AddToWalletBtn address={token.address as Address} />
    </div>
  );
}
