import Image from "next/image";
import { usePollAllProposals } from "@bera/berajs";
import { cloudinaryUrl, isIPFS } from "@bera/config";
import { SearchInput } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";
import { useParams, useRouter } from "next/navigation";
import { ProposalCard } from "./proposal-card";
import { ProposalSorting } from "./proposal-sorting";
import { ProposalStatusFilter } from "./proposal-status-filter";
import { Button } from "@bera/ui/button";
import { useGovernance } from "./governance-provider";
import {
  OrderDirection,
  ProposalStatus,
  Proposal_OrderBy,
} from "@bera/graphql/governance";
import { useState } from "react";

// const PROPOSALS_PER_PAGE = 100;

export const ProposalsList = () => {
  const router = useRouter();
  const parms = useParams();

  const { dappConfig } = useGovernance();
  const [sortBy, setSortBy] = useState<{
    orderBy: Proposal_OrderBy;
    orderDirection: OrderDirection;
  }>({
    orderBy: Proposal_OrderBy.CreatedAt,
    orderDirection: OrderDirection.Desc,
  });
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<ProposalStatus[]>([]);

  const { data, hasMore, isLoading, size, setSize } = usePollAllProposals({
    topic: dappConfig.slug,
    orderBy: sortBy.orderBy,
    status_in: statusFilter,
    orderDirection: sortBy.orderDirection,
    text: search,
  });

  const areFiltersSet = !!search || statusFilter.length !== 0;

  if (data?.flat().length === 0 && !areFiltersSet) {
    return (
      <div className="mx-auto w-fit">
        <Image
          src={`${cloudinaryUrl}/bears/e6monhixzv21jy0fqes1`}
          alt="not found bear"
          width={345.35}
          height={200}
        />
        <div className="mt-4 w-full text-center text-xl font-semibold leading-7 text-muted-foreground">
          No Proposals Found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex-col md:flex-row flex w-full justify-between mb-10 gap-4">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[300px] bg-transparent"
          placeholder="Search proposals..."
        />
        <div className="flex gap-4">
          <ProposalStatusFilter
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <ProposalSorting value={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      {(data && data.flat().length > 0) || isLoading ? (
        <div className="flex flex-col gap-4">
          {!data?.flat().length ? (
            <>
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </>
          ) : (
            data
              ?.slice(0, isLoading ? size : size - 1)
              .flat()
              .map((proposal) =>
                proposal ? (
                  <ProposalCard
                    proposal={proposal}
                    key={`proposal-${proposal.id}`}
                    className="hover:cursor-pointer"
                    onMouseOver={() => {
                      if (!isIPFS) {
                        router.prefetch(
                          isIPFS
                            ? `/governance/${parms.genre}/proposal/?id=${proposal.id}`
                            : `/governance/${parms.genre}/proposal/${proposal.id}`,
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
                ) : null,
              )
          )}
          {hasMore && (
            <Button disabled={isLoading} onClick={() => setSize((s) => s + 1)}>
              Load More
            </Button>
          )}
        </div>
      ) : (
        <div className="mx-auto w-fit">
          <Image
            src={`${cloudinaryUrl}/bears/e6monhixzv21jy0fqes1`}
            alt="not found bear"
            width={345.35}
            height={200}
          />
          <div className="mt-4 w-full text-center text-xl font-semibold leading-7 text-muted-foreground">
            No Proposals Found
          </div>
        </div>
      )}
    </div>
  );
};
