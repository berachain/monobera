import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { usePollAllProposals, type Proposal } from "@bera/berajs";
import { cloudinaryUrl, isIPFS } from "@bera/config";
import { SearchInput } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";
import { useParams, useRouter } from "next/navigation";
import { ProposalCard } from "./proposal-card";
import { ProposalSorting } from "./proposal-sorting";
import { ProposalStatusFilter } from "./proposal-status-filter";
import { useGetProposalsQuery } from "@bera/graphql/governance";

// const PROPOSALS_PER_PAGE = 100;

export const ProposalsList = () => {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const parms = useParams();
  // const {
  //   loading,
  //   error,
  //   data: proposals,
  // } = useQuery(getProposalss, {
  //   variables: {
  //     offset: page * PROPOSALS_PER_PAGE,
  //     limit: PROPOSALS_PER_PAGE,
  //   },
  //   pollInterval: 60000, // 1 min
  // });
  const { data } = useGetProposalsQuery({
    pollInterval: 0, // 1 min
  });

  return (
    <div className="w-full">
      <div className="flex-col md:flex-row flex w-full justify-between mb-10 gap-4">
        <SearchInput
          className="w-[300px] bg-transparent"
          placeholder="Search proposals..."
        />
        <div className="flex gap-4">
          <ProposalStatusFilter />
          <ProposalSorting />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {!data?.proposals ? (
          <>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </>
        ) : (
          data?.proposals.map((proposal) => (
            <ProposalCard
              proposal={proposal}
              key={`proposal-${proposal.id}`}
              className="hover:cursor-pointer"
              onMouseOver={() => {
                if (!isIPFS) {
                  router.prefetch(
                    `/governance/${parms.genre}/proposal/${proposal.id}`,
                  );
                }
              }}
              onClick={() => {
                router.push(
                  isIPFS
                    ? `/governance/${parms.genre}/proposal/?id=${proposal.id}`
                    : `/governance/${parms.genre}/proposal/${proposal.id}`,
                );
              }}
            />
          ))
        )}
      </div>

      {data?.proposals?.length === 0 && (
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
