import { BERA_CHEF_ABI, type ExecutableCalls } from "@bera/berajs";
import { Card } from "@bera/ui/card";

import { useGetVerifiedAbi } from "@bera/berajs";
import { ProposalTypeEnum } from "../../types";
import { Abi, AbiFunction, Address, decodeFunctionData } from "viem";

export const Actions = ({
  executableCalls,
  type,
}: {
  executableCalls: ExecutableCalls[];
  type: string | null;
}) => {
  return (
    <div className="flex-1">
      {executableCalls.map((executableCall, index) => {
        const { data, error, isLoading } = useGetVerifiedAbi(
          executableCall.target,
        );

        const abi: Abi =
          type === ProposalTypeEnum.UPDATE_REWARDS_GAUGE
            ? BERA_CHEF_ABI
            : data && !error && !isLoading
              ? JSON.parse(data)
              : [];

        const content = abi?.length
          ? decodeFunctionData({
              data: executableCall.calldata as Address,
              abi,
            })
          : { functionName: "", args: [] };
        const fn = abi.find(
          (a) => a.type === "function" && a.name === content.functionName,
        ) as AbiFunction;

        return (
          <Card
            key={`${executableCall.target}-${index}`}
            className="mt-1 h-full break-words p-4 text-sm font-normal leading-normal text-muted-foreground"
          >
            {content.functionName && (
              <>
                <div className="font-medium text-foreground">Function:</div>
                <div className=" whitespace-pre-line">
                  {content.functionName}
                </div>
                <br />
                <div className="font-medium text-foreground">Params:</div>
                <div className="whitespace-pre-line">
                  {content.args?.map((arg, idx) => (
                    <div key={idx}>
                      {fn.inputs[idx].name}: {arg?.toString()}
                    </div>
                  ))}
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
