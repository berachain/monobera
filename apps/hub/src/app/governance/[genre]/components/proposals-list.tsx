import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { usePollAllProposals, type Proposal } from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import { getProposals } from "@bera/graphql";
import { SearchInput } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

import { GovernanceTopic } from "../../governance-genre-helper";
import { ProposalCard } from "./proposal-card";
import { ProposalSorting } from "./proposal-sorting";
import { ProposalStatusFilter } from "./proposal-status-filter";

const PROPOSALS_PER_PAGE = 10;

export const ProposalsList = ({
  dappConfig,
}: {
  dappConfig: GovernanceTopic;
}) => {
  const [page, setPage] = useState(0);
  // use hookfrom codegen
  const {
    loading,
    error,
    data = { proposals: [] }, 
  } = useQuery(getProposals, {
    variables: {
      offset: page * PROPOSALS_PER_PAGE,
      limit: PROPOSALS_PER_PAGE,
    },
    pollInterval: 60000, // 1 min
  });
  return (
    <div className="w-full">
      <div className="mb-10 flex w-full flex-col justify-between gap-4 md:flex-row">
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
        {loading ? (
          <>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </>
        ) : (
          data?.proposals.map((proposal: Proposal) => (
            <ProposalCard
              proposal={proposal}
              key={`proposal-${proposal.id}`}
              dappConfig={dappConfig}
            />
          ))
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
