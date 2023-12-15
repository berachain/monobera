import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";

import { IMGMap } from "~/utils/image-map";

export default function VoteHistory({votes}:{votes:any[]}) {
  return (
    <div className="h-full flex-auto overflow-y-auto">
      <div className="font-retro-gaming text-lg leading-7">Vote History</div>
      <Accordion type="single" collapsible className="w-full">
        {votes
          .sort((a: any, b: any) => a.epochNumber - b.epochNumber)
          .map((vote: any, index) => (
            <AccordionItem
              value={vote.epochNumber}
              key={index}
              className="w-full"
            >
              <AccordionTrigger className="text-xs text-left">
                Epoch {vote.epochNumber}: <br/> Voted {vote.accused} -> {vote.pool}
              </AccordionTrigger>
              <AccordionContent>
                <div className="rounded-md bg-muted p-4 ">
                  <div className="mx-auto flex max-w-[300px] flex-col gap-4 text-center">
                  {vote.status && vote.status === "succesed" && <>
                  <Image
                      src={`${cloudinaryUrl}/clue/${IMGMap["made-elimination"]}`}
                      alt="made-elimination"
                      width={272}
                      height={172}
                      className="mx-auto rounded-sm"
                    />
                    <div className="font-retro-gaming text-lg leading-7">
                      You&apos;ve made an <br />
                      <span className="text-success-foreground">
                        elimination
                      </span>
                    </div>
                    </>}

                    {/* {vote.status && vote.status === "failed" && <> */}
                  <Image
                      src={`${cloudinaryUrl}/clue/${IMGMap["guessed-wrong"]}`}
                      alt="guessed-wrong"
                      width={272}
                      height={172}
                      className="mx-auto rounded-sm"
                    />
                    <div className="font-retro-gaming text-lg leading-7">
                      You&apos;ve made an <br />
                      <span className="text-destructive-foreground">
                        mistake
                      </span>
                    </div>
                    {/* </>} */}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
