import { useEffect, useState } from "react";
import Image from "next/image";
import {
  formatUsd,
  formatter,
  usePollValidatorBribes,
  useTokenInformation,
  useTokens,
  type Token,
} from "@bera/berajs";
import { TokenIcon, Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits, type Address } from "viem";

import { cloudinaryUrl } from "~/config";
import { usePollPrices } from "~/hooks/usePollPrices";

const BribeCard = ({
  amountPerProposal,
  tokenAddress,
  startEpoch,
  proposalsLeft,
  numBlockProposals,
}: {
  amountPerProposal: bigint;
  tokenAddress: any;
  startEpoch: bigint;
  proposalsLeft: bigint;
  numBlockProposals: bigint;
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
  const formattedTotalProposals = Number(numBlockProposals ?? 0);

  return (
    <Card className="flex w-full flex-1 flex-col gap-3 p-8">
      <div className="flex items-center gap-2">
        <TokenIcon token={token} className="h-8 w-8" />
        <div>
          <div>
            {" "}
            {formatter.format(formattedTotalInUsd)} {token?.symbol}{" "}
          </div>
          <div className="text-xs text-muted-foreground">tokens remaining</div>
        </div>
      </div>
      <div className=" flex flex-col gap-2 text-sm font-medium leading-tight text-muted-foreground">
        <div>
          {formatUsd(formattedTotalInUsd)} (
          {formatUsd(formattedAmountPerProposalInUsd)} per block)
        </div>
      </div>
      <div className="flex justify-between text-sm font-medium leading-tight text-muted-foreground">
        <div>
          {formattedProposalsLeft} / {formattedTotalProposals} proposals left
        </div>
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
        <Skeleton className="h-8 w-[50px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </Card>
  );
};

export default function BribeList({
  validatorAddress,
}: {
  validatorAddress: Address;
}) {
  const { useActiveValidatorBribes, isLoading } =
    usePollValidatorBribes(validatorAddress);
  const bribes = [useActiveValidatorBribes() ?? []];
  const [lineCount, setLineCount] = useState(1);
  const bribesList =
    !isLoading && bribes && bribes[0] && bribes[0][0]
      ? bribes
          .map((bribe, index) => {
            const bribeObj = bribe[0];
            return bribeObj.bribePerProposal?.amounts.map(
              (amount: any, i: number) => {
                return {
                  key: `${index}bribe${i}`,
                  amountPerProposal: amount,
                  tokenAddress: bribeObj.bribePerProposal.tokens[i],
                  startEpoch: bribeObj.startEpoch,
                  proposalsLeft:
                    bribeObj.numBlockProposals -
                    bribeObj.numBlockProposalsBribed,
                  numBlockProposals: bribeObj.numBlockProposals,
                };
              },
            );
          })
          .flat()
      : [];
  return (
    <div className="">
      <div className="mb-4 flex items-center gap-1 text-lg font-semibold leading-7">
        Active Bribes{" "}
        <Tooltip text="A list of active bribes from this validator." />
      </div>
      <div>
        {isLoading ? (
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {[0, 0, 0].map((_: any, index: number) => (
              <BribeCardLoading key={index} />
            ))}
          </div>
        ) : bribesList.length !== 0 ? (
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {bribesList
              ?.slice(
                0,
                lineCount * 3 < bribesList.length
                  ? lineCount * 3
                  : bribesList.length,
              )
              .map((item: any, index) => (
                <BribeCard key={index} {...item} />
              ))}
          </div>
        ) : (
          <div className="mx-auto w-fit">
            <Image
              src={`${cloudinaryUrl}/bears/e6monhixzv21jy0fqes1`}
              alt="not found bear"
              width={345.35}
              height={200}
            />
            <div className="mt-4 w-full text-center text-xl font-semibold leading-7 text-muted-foreground">
              The Validator has no bribes
            </div>
          </div>
        )}
      </div>
      {lineCount * 3 < bribesList.length && (
        <div className="mt-3 w-full text-center">
          <Button variant="outline" onClick={() => setLineCount(lineCount + 1)}>
            {" "}
            Load More{" "}
          </Button>
        </div>
      )}
    </div>
  );
}
