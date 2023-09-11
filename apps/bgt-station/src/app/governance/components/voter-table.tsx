import React, { useMemo } from "react";
import Image from "next/image";
import { formatter, truncateHash, type IVote } from "@bera/berajs";
import { VoteOption } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/gov";
import Identicon from "@bera/shared-ui/src/identicon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";
import { Badge } from "@bera/ui/badge";
import { Card } from "@bera/ui/card";
import { Skeleton } from "@bera/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { getAddress } from "viem";

import { cloudinaryUrl } from "~/config";
import { MultiSelectBadge } from "../components/multi-select-badge";
import { type ALL, type VOTER_TYPE } from "../types";

const userTypes: Array<ALL | VOTER_TYPE> = ["all", "validators", "users"];

const getBadge = (vt: number) => {
  switch (vt) {
    case VoteOption.VOTE_OPTION_NO_WITH_VETO:
      return (
        <Badge
          variant="info"
          className="w-20 justify-center border-none px-2 py-1 text-sm capitalize"
        >
          veto
        </Badge>
      );
    case VoteOption.VOTE_OPTION_ABSTAIN:
      return (
        <Badge
          variant="secondary"
          className="w-20 justify-center border-none px-2 py-1 text-sm"
        >
          abstain
        </Badge>
      );
    case VoteOption.VOTE_OPTION_YES:
      return (
        <Badge
          variant="success"
          className="w-20 justify-center border-none px-2 py-1 text-sm capitalize"
        >
          yes
        </Badge>
      );
    case VoteOption.VOTE_OPTION_NO:
      return (
        <Badge
          variant="destructive"
          className="w-20 justify-center border-none px-2 py-1 text-sm capitalize"
        >
          no
        </Badge>
      );
    default:
      return "";
  }
};

export function VoterTable({
  votes,
  isLoading,
}: {
  votes: IVote[];
  isLoading: boolean;
}) {
  const [voterTypes, setVoterTypes] = React.useState<ALL | VOTER_TYPE>("all");
  const [voteType, setVoteType] = React.useState<number[]>([]);

  const voterData = useMemo(
    () =>
      votes
        // .filter((data) =>
        //   voterTypes === "all" ? true : data.voterTypes === voterTypes,
        // )
        .filter(
          (data) => voteType.length === 0 || voteType.includes(data.option),
        ),

    [voteType, voterTypes, votes],
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <Tabs defaultValue={voterTypes} className="my-4">
          <TabsList>
            {userTypes.map((type: ALL | VOTER_TYPE) => (
              <TabsTrigger
                value={type}
                key={type}
                className="capitalize"
                onClick={() => setVoterTypes(type)}
              >
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <MultiSelectBadge onSelect={(value) => setVoteType(value)} />
      </div>
      <Card className="relative ">
        <div className="flex h-11 w-full gap-16 rounded-tl-[18px] rounded-tr-[18px] border-b border-border bg-muted px-5 py-3 text-xs font-medium leading-tight text-muted-foreground">
          {" "}
          <div className="flex flex-grow items-center">Voter</div>
          <div className="flex w-[60px] items-center justify-center">
            Stance
          </div>
          <div className="flex w-[100px] items-center justify-center ">
            Voting power
          </div>
        </div>
        <div className="max-h-[800px] overflow-y-scroll p-4">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {" "}
              {[0, 0, 0, 0, 0, 0].map((_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
              ))}{" "}
            </div>
          ) : voterData.length === 0 ? (
            <div className="mx-auto w-fit">
              <Image
                src={`${cloudinaryUrl}/bears/e6monhixzv21jy0fqes1`}
                alt="not found bear"
                width={345.35}
                height={200}
              />
              <div className="my-4 w-full text-center text-xl font-semibold leading-7 text-muted-foreground">
                No recent votes found.{" "}
              </div>
            </div>
          ) : (
            voterData?.map((voter) => (
              <div key={voter.voter} className="flex gap-16">
                <Accordion
                  type="single"
                  collapsible
                  className="flex-grow"
                  disabled={voter?.metadata === undefined}
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger disabled={voter?.metadata === undefined}>
                      <div className="flex items-center gap-2 text-sm">
                        <Identicon account={getAddress(voter.voter)} />
                        {truncateHash(voter.voter, 6, 4)}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="max-w-[436px] pl-10 text-xs font-medium leading-tight text-muted-foreground">
                      {voter?.metadata}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex h-[56px] w-[60px] items-center justify-center">
                  {getBadge(voter.option)}
                </div>
                <div className="flex h-[56px] w-[100px] items-center justify-center text-xs font-medium leading-tight text-foreground">
                  {" "}
                  {formatter.format(voter.delegation)}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
      <div className="mt-4 w-full text-right text-xs font-medium leading-tight text-muted-foreground">
        {votes.length} addresses
      </div>
    </div>
  );
}
