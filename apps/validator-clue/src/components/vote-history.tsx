import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";

import { IMGMap } from "~/utils/image-map";
import { usePollMe } from "~/hooks/usePollMe";

export default function VoteHistory({
  pools,
  validators,
}: {
  pools: any[];
  validators: any[];
}) {
  const { data: me } = usePollMe();
  const votes = me?.votes || [];
  return (
    <div className="h-full flex-auto overflow-y-auto">
      <div className="font-retro-gaming text-lg leading-7">Vote History</div>
      <Accordion
        type="single"
        className="w-full"
        defaultValue="item-0"
        collapsible
      >
        {votes
          .sort((a: any, b: any) => b.epochNumber - a.epochNumber)
          .map((vote: any, index: any) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="w-full"
            >
              <AccordionTrigger className="text-left text-xs">
                <div>
                  Epoch {vote.epochNumber} {`item-${index}`}: <br /> Voted{" "}
                  <span className="text-info-foreground">
                    {
                      validators.find((vali) => vali.address === vote.accused)
                        .name
                    }
                  </span>{" "}
                  owns{" "}
                  <span className="text-info-foreground">
                    {pools.find((pool) => pool.address === vote.pool).name}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="rounded-md bg-muted p-4 ">
                  <div className="mx-auto flex max-w-[300px] flex-col gap-4 text-center">
                    {vote.status && vote.status === "succesed" && (
                      <>
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
                      </>
                    )}

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
