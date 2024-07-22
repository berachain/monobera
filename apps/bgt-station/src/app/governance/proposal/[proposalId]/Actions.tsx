import { type ExecutableCalls } from "@bera/berajs";
import { Card } from "@bera/ui/card";

import { decodeProposalCalldata } from "../../helper";

export const Actions = ({
  executableCalls,
  type,
}: {
  executableCalls: ExecutableCalls[];
  type: string | null;
}) => {
  return (
    <div className="flex-1">
      <div className="h-7 text-lg font-semibold leading-7 text-foreground">
        Actions
      </div>
      {executableCalls.map((executableCall, index) => {
        const content = decodeProposalCalldata(type, executableCall.calldata);
        return (
          <Card
            key={`${executableCall.target}-${index}`}
            className="mt-1 h-full max-h-[376px] break-words bg-muted p-4 text-sm font-normal leading-normal text-muted-foreground"
          >
            {content.function && (
              <>
                <div className="font-medium text-foreground">Function:</div>
                <div className=" whitespace-pre-line">{content.function}</div>
                <br />
                <div className="font-medium text-foreground">Params:</div>
                <div className=" whitespace-pre-line">
                  {content.params.toLocaleString()}
                </div>
                <br />
              </>
            )}
            <div className="font-medium text-foreground">Calldata:</div>
            <div className=" whitespace-pre-line">
              {executableCall.calldata}
            </div>
            <br />
            <div className="font-medium text-foreground">Target:</div>
            <div>{executableCall.target}</div>
          </Card>
        );
      })}
    </div>
  );
};
