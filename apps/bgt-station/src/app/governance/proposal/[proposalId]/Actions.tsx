import { Card } from "@bera/ui/card";
import { ExecutableCalls } from "@bera/berajs";

export const Actions = ({
  executableCalls,
}: {
  executableCalls: ExecutableCalls[];
}) => {
  return (
    <div className="flex-1">
      <div className="h-7 text-lg font-semibold leading-7 text-foreground">
        Actions
      </div>
      {executableCalls.map((executableCall, index) => (
        <Card
          key={`${executableCall.target}-${index}`}
          className="mt-1 h-full max-h-[376px] bg-muted p-4 text-sm font-normal leading-normal text-muted-foreground break-words"
        >
          <div className="font-medium text-md text-foreground">
            Function {index + 1}
          </div>
          <br />
          <div className="font-medium text-foreground">Calldata:</div>
          <div className=" whitespace-pre-line">{executableCall.calldata}</div>
          <br />
          <div className="font-medium text-foreground">Target:</div>
          <div>{executableCall.target}</div>
        </Card>
      ))}
    </div>
  );
};
