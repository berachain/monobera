import { type Token } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";

type Props = {
  token: Token | undefined;
  className?: string;
};
export const TokenIcon = ({ token, className }: Props) => {
  return (
    <Avatar className={cn("h-12 w-12 rounded-full", className)}>
      <AvatarImage
        src={`/icons/${token?.symbol.toLowerCase()}.jpg`}
        className="p-1"
      />
      <AvatarFallback className="font-bold">
        {token ? token?.symbol.slice(0, 3) : ""}
      </AvatarFallback>
    </Avatar>
  );
};
