import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { usePollAllProposals, type Proposal } from "@bera/berajs";
import { cloudinaryUrl, isIPFS } from "@bera/config";
import {
  getProposals,
  useGetProposalsLazyQuery,
  useGetProposalsQuery,
  useGetProposalsSuspenseQuery,
} from "@bera/graphql";
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
  const { data = { proposals: [] }, loading } = useGetProposalsQuery({
    variables: {
      offset: page * PROPOSALS_PER_PAGE,
      limit: PROPOSALS_PER_PAGE,
    },
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

      {/* fix this later ;P */}
      <div className="flex justify-between uppercase mb-3 text-muted-foreground text-xs font-semibold tracking-widest">
        <div>proposal</div>
        <div>Quorum</div>
        <div>Votes</div>
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
              // onMouseOver={() => {
              //   if (!isIPFS) {
              //     router.prefetch(`/governance/proposal/${proposal.id}`);
              //   }
              // }}
              // onClick={() => {
              //   router.push(
              //     isIPFS
              //       ? `/governance/proposal/?id=${proposal.id}`
              //       : `/governance/proposal/${proposal.id}`,
              //   );
              // }}
            />
          ))
        )}
      </div>
    </div>
  );
};
