import { type Token } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";

export function TokenBadge({ token }: { token: Token }) {
  return (
    <div className="mx-2 inline-flex h-8 w-fit items-center gap-1 rounded bg-muted px-2 py-1 font-medium text-foreground">
      <TokenIcon token={token} />
      {token.symbol}
    </div>
  );
}
