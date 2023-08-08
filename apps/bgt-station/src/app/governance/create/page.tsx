"use client";

import { useRouter } from "next/navigation";
import { Tooltip } from "@bera/shared-ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Input } from "@bera/ui/input";

import { ProposalTypeEnum } from "../types";

export default function NewProposal({
  searchParams,
}: {
  searchParams: {
    type: ProposalTypeEnum;
  };
}) {
  const router = useRouter();
  return (
    // font wrong
    // color not working
    // input customizations?? should i make it a shared ui
    // no textarea wat to do
    <div className="mx-auto">
      <div className="mx-auto flex w-full max-w-[550px] flex-col justify-start gap-8 bg-gray-100">
        <div>
          <div
            className="text--muted-foreground flex h-[28px] items-center text-sm hover:cursor-pointer"
            onClick={() => router.push(`/governance`)}
          >
            {"<-"} Governance
          </div>
          <div className="text--primary-foreground text-center text-5xl font-extrabold leading-[48px]">
            ✏️ New proposal
          </div>
        </div>

        <div className="inline-flex flex-col justify-start gap-1">
          <div className="text-sm font-semibold leading-tight">
            Type <Tooltip text="test" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="inline-flex h-[42px] w-full flex-col items-start justify-start hover:cursor-pointer">
                <div className="inline-flex w-full items-center justify-start gap-2.5 rounded border border-gray-200 bg-white px-3 py-2">
                  <div className="shrink grow basis-0 text-sm font-normal leading-normal text-stone-700">
                    {searchParams.type}
                  </div>
                  {/* missing */}
                  <div className="relative h-4 w-4" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[550px]">
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

        <div className="inline-flex flex-col justify-start gap-1">
          <div className="text-sm font-semibold leading-tight">Title</div>
          <Input
            type="text"
            id="proposal-title"
            // value={"proposals"}
            // onChange={(e) => {}}
          />
        </div>

        <div className="inline-flex flex-col justify-start gap-1">
          <div className="text-sm font-semibold leading-tight">
            Forum discussion link <Tooltip text="test" />
          </div>
          <Input
            type="text"
            id="forum-discussion-link"
            // value={"forum-discussion-link"}
            // onChange={(e) => {}}
          />
        </div>

        <div className="inline-flex flex-col justify-start gap-1">
          <div className="text-sm font-semibold leading-tight">Description</div>
          {/* <Textarea placeholder="Type your message here." /> */}
          <textarea
            name="message"
            id="message"
            rows={3}
            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={""}
          />
        </div>
      </div>
    </div>
  );
}
