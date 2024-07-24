import { useState } from "react";
import Image from "next/image";
import { usePollMarkets, type Market } from "@bera/berajs";
import { SearchInput } from "@bera/shared-ui";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";

export default function MarketSelector({
  markets,
  setMarkets,
}: {
  markets: string[];
  setMarkets: (markets: string[]) => void;
}) {
  const { marketList = [] } = usePollMarkets();
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild onClick={() => setOpen(true)}>
        <div className="flex cursor-pointer items-center gap-4 whitespace-nowrap rounded-md border border-border bg-muted px-3 py-2 text-sm leading-6">
          Select Market
          <Icons.chevronDown className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[250px] border border-border bg-background p-0"
        onMouseLeave={() => setTimeout(() => setOpen(false), 100)}
      >
        <SearchInput
          placeholder="Search..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            console.log(e.target.value)
          }
          className="rounded-none border-none"
        />
        <DropdownMenuSeparator className="my-0" />
        <div className="max-h-[200px] overflow-auto p-1">
          {marketList.map((market: Market, index: number) => (
            <DropdownMenuCheckboxItem
              key={`selector-${index}-${market.name}`}
              className="flex items-center gap-1 hover:bg-muted hover:text-foreground"
              checked={markets.find((m) => m === market.name) !== undefined}
              onCheckedChange={(checked: boolean) => {
                if (checked) {
                  setMarkets([...markets, market.name]);
                } else {
                  setMarkets(markets.filter((m) => m !== market.name));
                }
              }}
            >
              <Image
                src={market.logoURI}
                alt={market.name}
                className="h-4 w-4"
                width={16}
                height={16}
              />
              {market.name}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
