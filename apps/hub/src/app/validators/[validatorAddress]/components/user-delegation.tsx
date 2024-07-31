import { Button } from "@bera/ui/button";

export const UserDelegation = () => {
  const empty = false;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Your Delegations</div>
        <Button>Delegate</Button>
      </div>
      {empty ? (
        <div className="flex h-full w-full items-center justify-center text-center text-sm font-medium leading-5 text-muted-foreground">
          You have no current or queued delegations
          <br />
          in this validator.
        </div>
      ) : (
        <>
          <div className="w-full rounded-sm border border-border p-4">hi</div>
          <hr />
          <div className="w-full rounded-sm border border-border">
            {" "}
            ready to confirm xxxx
          </div>
        </>
      )}
    </div>
  );
};
