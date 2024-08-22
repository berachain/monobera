import { SwapInfoV3, Token } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Address } from "viem";

export const SwapRoute = ({
  swapInfo,
  tokenIn,
  tokenOut,
}: { swapInfo: SwapInfoV3; tokenIn: Token; tokenOut: Token }) => {
  return (
    <div className="flex flex-row flex-wrap w-full p-4 items-center gap-2 border border-border rounded-md mb-4">
      <TokenIcon address={tokenIn.address} size={"lg"} />
      <span className="text-sm font-medium">{tokenIn.symbol}</span>
      <Icons.arrowRight className="h-4 w-4" />
      {swapInfo.batchSwapSteps.map((step, index) => (
        <div key={index} className="flex flex-row">
          <TokenIcon address={step.base as Address} size={"lg"} />
          <TokenIcon
            address={step.quote as Address}
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
