import { Icons } from "@bera/ui/icons";

export default function Header() {
  return (
    <div className="flex h-[72px] w-full items-center gap-4 border-b border-border bg-background px-4 text-foreground">
      <Icons.logo className="h-[30px] w-[60px]" />
      <div className="font-retro-gaming text-lg">Validator Clue</div>
    </div>
  );
}
