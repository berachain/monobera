import { BERA_CHEF_ABI, truncateHash } from "@bera/berajs";
import { Card } from "@bera/ui/card";

import { useGetVerifiedAbi } from "@bera/berajs";
import { ExecutableCallSubsetFragment } from "@bera/graphql/governance";

import { Abi, AbiFunction, Address, decodeFunctionData, erc20Abi } from "viem";

export const Actions = ({
  executableCalls,
}: {
  executableCalls: ExecutableCallSubsetFragment[];
}) => {
  return (
    <>
      {executableCalls.map((executableCall, index) => {
        const { data, error, isLoading } = useGetVerifiedAbi(
          executableCall.target,
        );

        const abi: Abi = [
          ...BERA_CHEF_ABI,
          ...erc20Abi,
          ...(data && !error && !isLoading ? JSON.parse(data) : []),
        ];

        let content: {
          args: readonly unknown[] | undefined;
          functionName: string;
        } = { functionName: "", args: [] };

        try {
          content = decodeFunctionData({
            data: executableCall.calldata as Address,
            abi,
          });
        } catch (error) {}
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
            <br />
            <div className="font-medium text-foreground">Value in wei:</div>
            <div>{executableCall.value}</div>
          </Card>
        );
      })}
    </>
  );
};
