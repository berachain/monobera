import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePollAllProposals, type Proposal } from "@bera/berajs";
import { cloudinaryUrl, isIPFS } from "@bera/config";
import { Skeleton } from "@bera/ui/skeleton";

import { ProposalCard } from "./proposal-card";

export const ProposalsList = () => {
  const { data } = usePollAllProposals();
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="max-sm:hidden font-medium text-xs text-muted-foreground px-4 lg:pr-8 xl:pr-16 gap-4 grid grid-cols-[4fr_2.5fr_2.5fr] mb-3 uppercase">
        <h4>Proposal</h4>
        <h4>Votes</h4>
        <h4>Quorum</h4>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {data?.map((proposal: Proposal) => (
          <ProposalCard
            proposal={proposal}
            key={`proposal-${proposal.id}`}
            className="hover:cursor-pointer"
            onClick={() =>
              router.push(
                `/governance/proposal${isIPFS ? "?id=" : "/"}${proposal.id}`,
              )
            }
            onMouseOver={() =>
              router.prefetch(
                `/governance/proposal${isIPFS ? "?id=" : "/"}${proposal.id}`,
              )
            }
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
