import { Card } from "@bera/ui/card";

export const Actions = () => {
  return (
    <div className="flex-1 sm:w-0.5">
      <div className="h-7 text-lg font-semibold leading-7 text-foreground">
        Actions
      </div>
      <Card className="mt-1 h-full max-h-[376px] overflow-scroll break-words bg-muted px-3 py-2 text-sm font-normal leading-normal text-muted-foreground">
        <div>text/xxxxx/ unknowxx</div>
        <div>Account</div>
      </Card>
    </div>
  );
};
