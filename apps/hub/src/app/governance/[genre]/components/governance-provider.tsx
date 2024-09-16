"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { ApolloProvider } from "@apollo/client";
import {
  useBeraJs,
  usePollBalance,
  usePollProposalThreshold,
  usePollUserDelegates,
} from "@bera/berajs";
import { bgtTokenAddress, governorAddress } from "@bera/config";
import { getClient } from "@bera/graphql";
import BigNumber from "bignumber.js";
import { Address } from "viem";

import {
  DappConfig,
  PROPOSAL_GENRE,
  getDappByGenre,
  isValidGenre,
} from "../../governance-genre-helper";
import { DelegateModal } from "./delegate-modal";
import { NotEnoughVotingPower } from "./not-enough-voting-power";

type GovernanceContextType = {
  canPropose: boolean;
  votesThreshold?: string;
  /**
   * The voting delegated to the user, by themselves or others
   */
  currentVotes?: string;
  /**
   * The BGT token balance of the user
   */
  tokenBalance: string | undefined;
  isLoading: boolean;
  delegatedToThemselves: string;
  delegatedByOthers: string;
  governorAddress: Address;
  openNotEnoughVotingPowerDialog: (args?: {
    onClose?: () => void;
    isOpen?: boolean;
  }) => void;
  dappConfig: DappConfig;
};

const GovernanceContext = createContext<GovernanceContextType | undefined>(
  undefined,
);

export const useGovernance = () => {
  const context = useContext(GovernanceContext);
  if (!context) {
    throw new Error("useGovernance must be used within a GovernanceProvider");
  }
  return context;
};

// Provides a context for the governance page
export const GovernanceProvider = ({
  genre,
  children,
}: {
  genre: PROPOSAL_GENRE;
  children: React.ReactNode;
}) => {
  if (!isValidGenre(genre)) return notFound();
  const dappConfig = getDappByGenre(genre);
  const client = getClient(dappConfig!.subgraph);

  const { account } = useBeraJs();
  const { data: tokenBalanceData, isLoading: isLoadingTokenBalance } =
    usePollBalance({ address: bgtTokenAddress });

  const [isDialogOpen, setIsDialogOpen] = useState<{
    isOpen: boolean;
    onClose: () => void;
  }>({
    isOpen: false,
    onClose: () => {},
  });
  const [isDelegateModalOpen, setIsDelegateModalOpen] = useState<{
    isOpen: boolean;
    onClose: () => void;
  }>({
    isOpen: false,
    onClose: () => {},
  });

  const { data: voteData, isLoading: isLoadingVotes } = usePollUserDelegates();
  const { data: votesThresholdData, isLoading: isLoadingVotesThreshold } =
    usePollProposalThreshold(governorAddress!);
  const canPropose =
    !!voteData &&
    !!votesThresholdData &&
    Number(voteData.currentVotes) >= Number(votesThresholdData.votesThreshold);

  const delegatedToThemselves =
    tokenBalanceData && voteData?.delegate === account
      ? tokenBalanceData.formattedBalance
      : "0";
  const delegatedByOthers =
    voteData?.currentVotes && tokenBalanceData
      ? BigNumber(voteData.currentVotes)
          .minus(BigNumber(delegatedToThemselves))
          .toString()
      : "0";

  useEffect(() => {
    if (canPropose) {
      setIsDialogOpen((prev) => ({ ...prev, isOpen: false }));
    }
  }, [canPropose]);

  return (
    <GovernanceContext.Provider
      value={
        {
          openNotEnoughVotingPowerDialog: ({
            onClose = () => {},
            isOpen = true,
          } = {}) => {
            setIsDialogOpen((prev) => ({ ...prev, isOpen, onClose }));
          },
          isLoading:
            isLoadingVotes || isLoadingVotesThreshold || isLoadingTokenBalance,
          governorAddress,
          dappConfig,
          delegatedByOthers,
          delegatedToThemselves,
          tokenBalance: tokenBalanceData?.formattedBalance,
          canPropose,
          votesThreshold: votesThresholdData?.votesThreshold,
          currentVotes: voteData?.currentVotes,
        } as GovernanceContextType
      }
    >
      <NotEnoughVotingPower
        onOpenDelegate={() =>
          setIsDelegateModalOpen((prev) => ({ ...prev, isOpen: true }))
        }
        isOpen={isDialogOpen.isOpen}
        onOpenChange={(isOpen) => {
          !isOpen && isDialogOpen.onClose?.();
          setIsDialogOpen((prev) => ({
            isOpen,
            onClose: isOpen ? prev.onClose : () => {},
          }));
        }}
        votesThreshold={votesThresholdData?.votesThreshold}
        currentVotes={voteData?.currentVotes}
      />
      <DelegateModal
        isOpen={isDelegateModalOpen.isOpen}
        onOpenChange={(isOpen) => {
          !isOpen && isDelegateModalOpen.onClose?.();

          setIsDelegateModalOpen((prev) => ({
            ...prev,
            isOpen,
          }));
          setIsDialogOpen((prev) => ({
            ...prev,
            isOpen: true,
          }));
        }}
      />
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </GovernanceContext.Provider>
  );
};
