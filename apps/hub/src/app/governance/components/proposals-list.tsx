import Image from "next/image";
import { usePollAllProposals, type Proposal } from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";

import { ProposalCard } from "./proposal-card";

export const ProposalsList = () => {
  const { data = [], isLoading } = usePollAllProposals();
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {!isLoading &&
          data.map((proposal: Proposal) => (
            <ProposalCard
              proposal={proposal}
              key={`proposal-${proposal.id}`}
              className="hover:cursor-pointer" //@ts-ignore
              onClick={() => {
                window.open(`/governance/proposal/${proposal.id}`, "_self");
              }}
            />
          ))}
      </div>

      {!isLoading && data.length === 0 && (
        <div className="mx-auto w-fit">
          <Image
            src={`${cloudinaryUrl}/bears/e6monhixzv21jy0fqes1`}
            alt="not found bear"
            width={345.35}
            height={200}
          />
          <div className="mt-4 w-full text-center text-xl font-semibold leading-7 text-muted-foreground">
            No Proposals found.{" "}
          </div>
        </div>
      )}
    </div>
  );
};
