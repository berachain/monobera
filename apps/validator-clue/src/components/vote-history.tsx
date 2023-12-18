// import Image from "next/image";
// import { cloudinaryUrl } from "@bera/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";

// import { IMGMap } from "~/utils/image-map";
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
    <div className="h-full flex-auto overflow-y-auto rounded-b-sm rounded-tl-none rounded-tr-sm border bg-muted py-4 md:rounded-sm">
      <div className="font-retro-gaming hidden px-2 text-lg leading-7 md:block">
        Vote History
      </div>
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
              <AccordionTrigger className=" px-3 text-left text-xs hover:bg-yellow-200">
                <div>
                  Epoch {vote.epochNumber} : <br /> Voted{" "}
                  <span className="text-foreground">
                    {
                      validators.find((vali) => vali.address === vote.accused)
                        .name
                    }
                  </span>{" "}
                  owns{" "}
                  <span className="text-foreground">
                    {pools.find((pool) => pool.address === vote.pool).name}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="border-b bg-background p-4">
                  <div className="mx-auto flex max-w-[300px] flex-col gap-4 text-center">
                    {vote.status && vote.status === "succesed" && (
                      <>
                        <div className="font-retro-gaming text-lg leading-7">
                          You&apos;ve made an <br />
                          <span className="text-success-foreground">
                            elimination
                          </span>
                        </div>
                      </>
                    )}

                    {/* {vote.status && vote.status === "failed" && <> */}
                    <div className="font-retro-gaming text-lg leading-7">
                      You guessed
                      <span className="px-2 text-destructive-foreground">
                        wrong
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
