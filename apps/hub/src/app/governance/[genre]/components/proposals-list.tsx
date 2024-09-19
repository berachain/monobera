import Image from "next/image";
import { usePollAllProposals, type Proposal } from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import { Skeleton } from "@bera/ui/skeleton";

import { ProposalCard } from "./proposal-card";
import { useRouter } from "next/navigation";

export const ProposalsList = () => {
  const { data } = usePollAllProposals();
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {data?.map((proposal: Proposal) => (
          <ProposalCard
            proposal={proposal}
            key={`proposal-${proposal.id}`}
            className="hover:cursor-pointer"
            onMouseOver={() => {
              router.prefetch(`/governance/proposal/${proposal.id}`);
            }}
            onClick={() => {
              router.push(`/governance/proposal/${proposal.id}`);
            }}
          />
        ))}
        {!data?.length && (
          <>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </>
        )}
      </div>

      {data?.length === 0 && (
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
