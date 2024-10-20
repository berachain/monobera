import { SwapInfo, Token } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Address } from "viem";

export const SwapRoute = ({
  swapInfo,
  tokenIn,
  tokenOut,
}: {
  swapInfo: SwapInfo;
  tokenIn: Token;
  tokenOut: Token;
}) => {
  return (
    <div className="mb-4 flex w-full flex-row flex-wrap items-center gap-2 rounded-md border border-border p-4">
      <TokenIcon address={tokenIn.address} size={"lg"} />
      <span className="text-sm font-medium">{tokenIn.symbol}</span>
      <Icons.arrowRight className="h-4 w-4" />
      {swapInfo.batchSwapSteps.map((step, index) => (
        <div key={index} className="flex flex-row">
          {/* TODO (#multiswap): properly define these as step-wise token in -> out via batchSwap asset steps */}
          <TokenIcon address={tokenIn.address} size={"lg"} />
          <TokenIcon
            address={tokenOut.address}
            size={"lg"}
            className="ml-[-8px]"
          />
        </div>
      ))}
      <Icons.arrowRight className="h-4 w-4" />
      <TokenIcon address={tokenOut.address} size={"lg"} />
      <span className="text-sm font-medium">{tokenOut.symbol}</span>
    </div>
  );
};
