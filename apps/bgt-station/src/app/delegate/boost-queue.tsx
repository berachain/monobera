import { usePollUserQueuedBoost } from "@bera/berajs";
import { timeDifferenceFromNow } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export const BoostQueue = () => {
  const { data } = usePollUserQueuedBoost();
  console.log(data);
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold leading-7">Delegation Queue</div>
      <ConfirmationCard ready time={1234} />
      <ConfirmationCard ready={false} time={1234} />
    </div>
  );
};

const ConfirmationCard = ({
  ready,
  time,
}: {
  ready: boolean;
  time: number;
}) => {
  const width = ready ? 100 : Math.round(Math.random() * 100);
  const timeText = (
    <span className=" text-info-foreground">{timeDifferenceFromNow(time)}</span>
  );
  return (
    <div className="w-full rounded-md border border-border p-4">
      <div className="flex w-full justify-between">
        <div className="font-medium">
          <div className="flex items-center gap-2">
            <Icons.bgt className="h-6 w-6" />
            <div>Validator A {width}</div>
          </div>
          <div className="ml-8 text-muted-foreground ">165.12 BGT</div>
        </div>
        <div>
          <Button variant="ghost" disabled={!ready}>
            Confirm
          </Button>
          <Button variant="ghost">Cancel</Button>
        </div>
      </div>

      <div className="mt-6 pl-8 pr-4">
        <div className="h-[9px] overflow-hidden rounded border border-border">
          <div
            className={cn(
              ready ? "bg-success-foreground" : "bg-info-foreground",
              "h-full",
            )}
            style={{ width: `${width}%` }}
          />
        </div>
        <div className="flex justify-between text-sm font-medium leading-6">
          {ready ? (
            <div className="text-success-foreground">
              Ready for confirmation
            </div>
          ) : (
            <div>Confirmation Wait Duration</div>
          )}
          <div>{ready ? <>Your have {timeText} to confirm</> : timeText}</div>
        </div>
      </div>
    </div>
  );
};
