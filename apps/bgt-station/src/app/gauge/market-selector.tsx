import { useState } from "react";
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
  markets: any;
  setMarkets: any;
}) {
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
          {Object.keys(markets).map((market: string, index: number) => (
            <DropdownMenuCheckboxItem
              key={`selector-${index}-${market}`}
              className="hover:bg-muted hover:text-foreground"
              checked={markets[market as keyof typeof markets].checked}
              onCheckedChange={(checked: boolean) => {
                markets[market as keyof typeof markets].checked = checked;
                setMarkets(markets);
              }}
            >
              {markets[market as keyof typeof markets].market.name}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
