import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function Claim() {
  return (
    <div className="w-full rounded-xl border border-border px-10 py-8">
      <div className="font-medium text-muted-foreground ">
        Available to Claim
      </div>
      <div className="flex items-center gap-2 text-3xl font-semibold leading-9">
        <Icons.nature className="h-7 w-7" />
        207.10
      </div>
      <Button className="mt-4 bg-primary px-4 py-2 text-primary-foreground">
        Claim Rewards
      </Button>
    </div>
  );
}
