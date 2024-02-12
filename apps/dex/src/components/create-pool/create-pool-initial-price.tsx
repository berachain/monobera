import React from "react";
import { TokenIcon } from "@bera/shared-ui";
import { Input } from "@bera/ui/input";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

type Props = {
  baseToken: ITokenWeight | undefined;
  initialPrice: string;
  onInitialPriceChange: (initialPrice: string) => void;
};

export default function CreatePoolInitialPriceInput({
  baseToken,
  initialPrice,
  onInitialPriceChange,
}: Props) {
  return (
    <li className={"flex w-full flex-col items-center p-2"}>
      <div className="flex w-full flex-row justify-between ">
        <div className="w-fit flex flex-row gap-1 self-center font-semibold">
          <TokenIcon address={baseToken?.token?.address} />
          {baseToken?.token?.symbol}
        </div>
        <Input
          type="number"
          step="any"
          min="0"
          placeholder="0"
          className="w-full grow border-0 bg-transparent p-0 text-right text-lg font-semibold outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={initialPrice}
          onChange={(e) => {
            onInitialPriceChange(e.target.value);
          }}
        />
      </div>
    </li>
  );
}
