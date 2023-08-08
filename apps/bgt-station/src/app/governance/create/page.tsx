"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { TextArea } from "@bera/ui/text-area";

import { ProposalTypeEnum } from "../types";

export default function NewProposal({
  searchParams,
}: {
  searchParams: {
    type: ProposalTypeEnum;
  };
}) {
  const router = useRouter();
  const triggerRef = useRef(null);
  const [contentWidth, setContentWidth] = useState("w-auto");

  useEffect(() => {
    if (triggerRef.current) {
      const width = triggerRef.current.offsetWidth;
      setContentWidth(`w-[${width}px]`);
    }
  }, []);

  return (
    // font wrong
    // color not working
    // input customizations?? should i make it a shared ui
    // no textarea wat to do
    <div className="mx-auto">
      <Card className="mx-auto flex w-full max-w-[500px] flex-col justify-start gap-8 p-6">
        <div className="inline-flex flex-col justify-start gap-3">
          <div className="relative text-lg font-semibold leading-7 text-foreground">
            New proposal {contentWidth}
            <Icons.close
              className="absolute right-0 top-0 h-5 w-5 hover:cursor-pointer"
              onClick={() => router.push(`/governance`)}
            />
          </div>
          <div className="h-[175px] w-full max-w-[452px] rounded-xl bg-slate-500">
            picture place holder
          </div>
        </div>

        <div className="inline-flex flex-col justify-start gap-2">
          <div className="text-sm font-semibold leading-tight">
            Type <Tooltip text="test" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className="inline-flex h-[42px] w-full flex-col items-start justify-start hover:cursor-pointer"
                ref={triggerRef}
              >
                <div className="inline-flex w-full items-center justify-start gap-2.5 rounded-xl border border-gray-200 px-3 py-2">
                  <div className="shrink grow basis-0 text-sm font-normal leading-normal text-stone-700">
                    {searchParams.type.replaceAll("-", " ")}
                  </div>
                  {/* missing */}
                  <div className="relative h-4 w-4" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className={`${contentWidth}`}>
              {Object.values(ProposalTypeEnum).map((type: string) => (
                <DropdownMenuItem
                  key={`proposal-option-${type}`}
                  onClick={() => router.push(`/governance/create?type=${type}`)}
                >
                  {type.replaceAll("-", " ")}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="inline-flex flex-col justify-start gap-2">
          <div className="text-sm font-semibold leading-tight">Title</div>
          <Input
            type="text"
            id="proposal-title"
            placeholder="Ooga booga"
            // value={"proposals"}
            // onChange={(e) => {}}
          />
        </div>

        <div className="inline-flex flex-col justify-start gap-2">
          <div className="text-sm font-semibold leading-tight">
            Forum discussion link <Tooltip text="test" />
          </div>
          <Input
            type="text"
            id="forum-discussion-link"
            placeholder="Paste link here"
            // value={"forum-discussion-link"}
            // onChange={(e) => {}}
          />
        </div>

        <div className="inline-flex flex-col justify-start gap-2">
          <div className="text-sm font-semibold leading-tight">Description</div>
          <TextArea
            name="message"
            id="message"
            placeholder="Tell us about your proposal"
          />
        </div>
      </Card>
    </div>
  );
}
