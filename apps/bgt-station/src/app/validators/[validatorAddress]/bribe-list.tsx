import { useEffect, useState } from "react";
import {
  formatUsd,
  usePollEpochs,
  useTokenInformation,
  useTokens,
  type Token,
} from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { beraJsConfig } from "@bera/wagmi";
import { formatUnits } from "viem";

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
  const { tokenDictionary } = useTokens({
    config: beraJsConfig,
  });
  const { read, tokenInformation } = useTokenInformation(
    useTokenInformation({
      config: beraJsConfig,
    }),
  );

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

  const price = 0;
  const formattedAmountPerProposal = Number(
    formatUnits(amountPerProposal, token?.decimals ?? 18),
  );
  const formattedAmountPerProposalInUsd = formattedAmountPerProposal * price;
  const total = amountPerProposal * proposalsLeft;
  const formattedTotal = Number(formatUnits(total, token?.decimals ?? 18));
  const formattedTotalInUsd = formattedTotal * price;
  const formattedProposalsLeft = Number(proposalsLeft ?? 0);
  const formattedTotalProposals = Number(numBlockProposals ?? 0);

  const info = [
    {
      title: "Total Value",
      value: formatUsd(formattedTotalInUsd),
    },
    {
      title: "Block Value",
      value: formatUsd(formattedAmountPerProposalInUsd),
    },
    {
      title: "Return per BGT",
      value: formatUsd(formattedAmountPerProposalInUsd),
    },
    {
      title: "Proposals left",
      value: `${formattedProposalsLeft}/${formattedTotalProposals}`,
    },
  ];
  return (
    <Card className="w-full">
      <div className="flex w-full items-center gap-2 p-6">
        <TokenIcon address={token?.address ?? ""} className="h-8 w-8" />
        <div className="font-medium">
          {formattedTotal.toFixed(6)} {token?.symbol}{" "}
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 rounded-b-[17px] bg-muted p-6">
        <div className="flex flex-col gap-2">
          {info.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-sm font-medium leading-5 text-muted-foreground"
            >
              <div>{item.title}</div>
              <div className="text-foreground">{item.value}</div>
            </div>
          ))}
        </div>
        <hr className="h-[1px] bg-border" />
        <div className="flex justify-between text-sm font-medium leading-tight text-foreground">
          <div>Start Epoch: {Number(startEpoch ?? 0)}</div>
          <div className="flex items-center gap-1">
            End Epoch: {Number(startEpoch + numBlockProposals ?? 0)}
            <Icons.clock className="block h-4 w-4" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export const BribeCardLoading = () => {
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

export default function BribeList({ bribes }: { bribes: any[][] }) {
  const { useCurrentEpoch } = usePollEpochs();
  const epochs = useCurrentEpoch();
  const secondsPerEpoch = (epochs?.endTime ?? 0) - (epochs?.startTime ?? 0);

  const bribesList = bribes?.[0]?.[0]
    ? bribes.flatMap((bribe, index) => {
        const bribeObj = bribe[0];
        return bribeObj.bribePerProposal?.amounts.map(
          (amount: any, i: number) => {
            return {
              key: `${index}bribe${i}`,
              amountPerProposal: amount,
              tokenAddress: bribeObj.bribePerProposal.tokens[i],
              startEpoch: bribeObj.startEpoch,
              proposalsLeft:
                bribeObj.numBlockProposals - bribeObj.numBlockProposalsBribed,
              numBlockProposals:
                (bribeObj.numBlockProposals * 5n) / BigInt(secondsPerEpoch),
            };
          },
        );
      })
    : [];
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex gap-4 text-sm font-normal text-muted-foreground">
          Hide token breakdown
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {bribesList?.map((item: any, index) => (
              <BribeCard key={index} {...item} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
