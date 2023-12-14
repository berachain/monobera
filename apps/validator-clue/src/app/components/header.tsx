import { Icons } from "@bera/ui/icons";

export default function Header() {
  return (
    <div className="w-full border-b border-border bg-background text-foreground h-[72px] flex items-center gap-4 px-4">
      <Icons.logo className="w-[60px] h-[30px]" />
      <div className="text-lg font-retro-gaming">Validator Clue</div>
    </div>
  );
}
