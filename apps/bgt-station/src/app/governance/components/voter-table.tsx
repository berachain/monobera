import React, { useMemo } from "react";
import Image from "next/image";
import { truncateHash } from "@bera/berajs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";
import { Badge } from "@bera/ui/badge";
import { Card } from "@bera/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { cloudinaryUrl } from "~/config";
import { MultiSelectBadge } from "../components/multi-select-badge";
import { generateRandomData } from "../home/mockData";
import { type ALL, type VOTER_TYPE } from "../types";

const userTypes: Array<ALL | VOTER_TYPE> = ["all", "validators", "users"];

const getBadge = (vt: string) => {
  switch (vt) {
    case "veto":
      return (
        <Badge
          variant="info"
          className="w-20 justify-center border-none px-2 py-1 text-sm capitalize"
        >
          {vt}
        </Badge>
      );
    case "abstain":
      return (
        <Badge
          variant="secondary"
          className="w-20 justify-center border-none px-2 py-1 text-sm"
        >
          {vt}
        </Badge>
      );
    case "yes":
      return (
        <Badge
          variant="success"
          className="w-20 justify-center border-none px-2 py-1 text-sm capitalize"
        >
          {vt}
        </Badge>
      );
    case "no":
      return (
        <Badge
          variant="destructive"
          className="w-20 justify-center border-none px-2 py-1 text-sm capitalize"
        >
          {vt}
        </Badge>
      );
    default:
      return "";
  }
};

export function VoterTable() {
  const [voterTypes, setVoterTypes] = React.useState<ALL | VOTER_TYPE>("all");
  const [voteType, setVoteType] = React.useState<string[]>([]);

  const voterData = useMemo(
    () =>
      generateRandomData()
        .filter((data) =>
          voterTypes === "all" ? true : data.voterTypes === voterTypes,
        )
        .filter(
          (data) => voteType.includes(data.voteType) || voteType.length === 0,
        ),

    [voteType, voterTypes],
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
          {voterData.map((voter) => (
            <div key={voter.voter} className="flex gap-16">
              <Accordion type="single" collapsible className="flex-grow">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2 text-sm">
                      <Image
                        alt="proposal owner avatar"
                        className="rounded-full"
                        src={`${cloudinaryUrl}/bears/pgnhgjsm1si8gb2bdm1m`}
                        width={32}
                        height={32}
                      />
                      {truncateHash(
                        "0x20f33CE90A13a4b5E7697E3544c3083B8F8A51D4",
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[436px] pl-10 text-xs font-medium leading-tight text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam tincidunt dui vitae metus feugiat rhoncus. Fusce quis
                    mattis dolor.Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Nullam tincidunt dui vitae metus feugiat
                    rhoncus. Fusce quis mattis dolor.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex h-[56px] w-[60px] items-center justify-center">
                {getBadge(voter.voteType)}
              </div>
              <div className="flex h-[56px] w-[100px] items-center justify-center text-xs font-medium leading-tight text-foreground">
                {" "}
                69.42M(6.9%)
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="mt-4 w-full text-right text-xs font-medium leading-tight text-muted-foreground">
        {voterData.length} addresses
      </div>
    </div>
  );
}
