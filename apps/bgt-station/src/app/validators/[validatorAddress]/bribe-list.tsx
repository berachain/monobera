import { useEffect, useState } from "react";
import {
  formatUsd,
  usePollValidatorBribes,
  useTokenInformation,
  useTokens,
  type Token,
} from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits, type Address } from "viem";

import { usePollPrices } from "~/hooks/usePollPrices";

const BribeCard = ({
  amountPerProposal,
  tokenAddress,
  startEpoch,
  proposalsLeft,
}: {
  amountPerProposal: bigint;
  tokenAddress: any;
  startEpoch: bigint;
  proposalsLeft: bigint;
}) => {
  const [token, setToken] = useState<Token | undefined>(undefined);
  const { tokenDictionary } = useTokens();
  const { read, tokenInformation } = useTokenInformation();

  useEffect(() => {
    if (!tokenDictionary || !tokenAddress) setToken(undefined);
    if (tokenDictionary && tokenAddress) {
      if (!tokenDictionary[tokenAddress]) {
        void read({ address: tokenAddress });
      } else {
        setToken(tokenDictionary[tokenAddress]);
      }
    }
  }, [tokenDictionary, tokenAddress]);

  useEffect(() => {
    if (tokenInformation) {
      setToken(tokenInformation);
    }
  }, [tokenInformation]);

  const { usePrice } = usePollPrices();
  const price = usePrice(tokenAddress);
  const formattedAmountPerProposal = Number(
    formatUnits(amountPerProposal, token?.decimals ?? 18),
  );
  const formattedAmountPerProposalInUsd = formattedAmountPerProposal * price;
  const total = amountPerProposal * proposalsLeft;
  const formattedTotal = Number(formatUnits(total, token?.decimals ?? 18));
  const formattedTotalInUsd = formattedTotal * price;
  const formattedProposalsLeft = Number(proposalsLeft ?? 0);
  return (
    <Card className="flex flex-1 flex-col gap-3 p-8">
      <div className="flex items-center gap-2">
        <TokenIcon token={token} />
        <div>
          {formattedTotal} {token?.symbol}{" "}
          <span className="text-xs text-muted-foreground">
            tokens remaining
          </span>
        </div>
      </div>
      <div className=" flex flex-col gap-2 text-sm font-medium leading-tight text-muted-foreground">
        <div>
          {formatUsd(formattedTotalInUsd)} (
          {formatUsd(formattedAmountPerProposalInUsd)} per block)
        </div>
      </div>
      <div className="flex justify-between text-sm font-medium leading-tight text-muted-foreground">
        <div>{formattedProposalsLeft} proposals left</div>
      </div>
      <div className="flex justify-between text-sm font-medium leading-tight text-muted-foreground">
        <div>start epoch: {Number(startEpoch ?? 0)}</div>
      </div>
    </Card>
  );
};

const BribeCardLoading = () => {
  return (
    <Card className="flex flex-1 flex-col gap-3 p-8">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className=" flex flex-col gap-2 text-sm font-medium leading-tight text-muted-foreground">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex justify-between text-sm font-medium leading-tight text-muted-foreground">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex justify-between text-sm font-medium leading-tight text-muted-foreground">
        <Skeleton className="h-10 w-full" />
      </div>
    </Card>
  );
};

export default function BribeList({
  validatorAddress,
}: {
  validatorAddress: Address;
}) {
  const { useActiveValidatorBribes } = usePollValidatorBribes(validatorAddress);
  const { bribes, isLoading } = useActiveValidatorBribes();
  return (
    <div className="">
      {isLoading ||
        (bribes && (
          <div className="mb-4 flex items-center text-lg font-semibold leading-7">
            Active Bribes
          </div>
        ))}
      <div className="flex flex-col gap-4 md:flex-row">
        {isLoading ? (
          <>
            {[0, 0, 0].map((_: any, index: number) => (
              <BribeCardLoading key={index} />
            ))}
          </>
        ) : (
          <>
            {bribes?.map((item: any) => {
              return item.bribePerProposal.amounts.map(
                (amount: any, index: number) => {
                  return (
                    <BribeCard
                      key={index}
                      amountPerProposal={amount}
                      tokenAddress={item.bribePerProposal.tokens[index]}
                      startEpoch={item.startEpoch}
                      proposalsLeft={item.numBlockProposals}
                    />
                  );
                },
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
