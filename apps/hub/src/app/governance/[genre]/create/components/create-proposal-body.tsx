import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { TextArea } from "@bera/ui/text-area";

import { ProposalTypeEnum } from "../../../types";

export const CreateProposalBody = ({
  proposal,
  setProposal,
}: {
  proposal: any;
  setProposal: any;
}) => {
  return (
    <div className="flex flex-col justify-start gap-8">
      <div className="inline-flex flex-col justify-start gap-2">
        <div className="text-sm font-semibold leading-tight">Proposal Type</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="inline-flex h-[42px] w-full flex-col items-start justify-start hover:cursor-pointer">
              <div className=" inline-flex w-full items-center justify-start gap-2.5 rounded-md border border-border px-3 py-2">
                <div className="relative shrink grow basis-0 caption-top text-sm font-normal capitalize leading-normal text-muted-foreground">
                  {proposal.proposalType.replaceAll("-", " ")}
                  <Icons.chevronDown className="absolute right-0 top-1 h-4 w-4" />
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[400px]">
            {Object.values(ProposalTypeEnum).map((typeT: ProposalTypeEnum) => (
              <DropdownMenuCheckboxItem
                key={`proposal-option-${typeT}`}
                onClick={() =>
                  setProposal((prev: any) => ({
                    ...prev,
                    proposalType: typeT,
                  }))
                }
                checked={proposal.proposalType === typeT}
                className="w-full capitalize hover:text-foreground"
              >
                {typeT.replaceAll("-", " ")}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold leading-tight">Title</div>
        <Input
          type="text"
          id="proposal-title"
          placeholder="Ooga booga"
          value={proposal.title}
          onChange={(e) =>
            setProposal((prev: any) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        {proposal.title.length === 0 && (
          <div className="text-sm text-destructive-foreground">
            * Title is required
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold leading-tight">Description</div>
        <TextArea
          id="proposal-message"
          placeholder="Tell us about your proposal"
          value={proposal.description}
          onChange={(e) =>
            setProposal((prev: any) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold leading-tight">Title</div>
        <Input
          type="text"
          id="proposal-title"
          placeholder="Ooga booga"
          value={proposal.title}
          onChange={(e: any) =>
            setProposal((prev: any) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        {proposal.title.length === 0 && (
          <div className="text-sm text-destructive-foreground">
            * Title is required
          </div>
        )}
      </div>
    </div>
  );
};
