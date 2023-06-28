/* eslint-disable @typescript-eslint/no-floating-promises */
// TODO: remove eslint-disable
import { useEffect, useState } from "react";
import { useTokenInformation, type Token } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";

type Props = {
  token: Token | undefined;
  fetch?: boolean;
  className?: string;
};
export const TokenIcon = ({ token, className, fetch = false }: Props) => {
  const [selectedToken, setSelectedToken] = useState<Token | undefined>(token);
  const { read, tokenInformation } = useTokenInformation();
  console.log(selectedToken);
  useEffect(() => {
    if (fetch && token) {
      read({ address: token.address });
    }
    if (tokenInformation && fetch) {
      setSelectedToken(tokenInformation);
    }
  }, [read, token, fetch, tokenInformation]);
  return (
    <Avatar className={cn("h-12 w-12 rounded-full", className)}>
      <AvatarImage
        src={`/icons/${selectedToken?.symbol.toLowerCase()}.jpg`}
        className="p-1"
      />
      <AvatarFallback className="font-bold">
        {selectedToken ? selectedToken?.symbol.slice(0, 3) : ""}
      </AvatarFallback>
    </Avatar>
  );
};
