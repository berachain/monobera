"use client";
import BigNumber from "bignumber.js";

import { ApolloProvider } from "@apollo/client";
import {
  useBeraJs,
  usePollBalance,
  usePollProposalThreshold,
  usePollUserDelegates,
} from "@bera/berajs";
import { bgtClient } from "@bera/graphql";
import { createContext, useContext, useEffect, useState } from "react";
import { Address } from "viem";
import {
  governanceTokenAddress,
  governorAddress as governorAddressFromEnv,
} from "@bera/config";
import { NotEnoughVotingPower } from "./not-enough-voting-power";
import { DelegateModal } from "../[genre]/components/delegate-modal";
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
const _GovernanceProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: update this if we want to support multiple governors
  const [governorAddress, setGovernorAddress] = useState<Address>(
    governorAddressFromEnv,
  );
  const { account } = useBeraJs();
  const { data: tokenBalanceData, isLoading: isLoadingTokenBalance } =
    usePollBalance({ address: governanceTokenAddress });

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
      {children}
    </GovernanceContext.Provider>
  );
};

export const GovernanceProvider = ({
  children,
}: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={bgtClient}>
      <_GovernanceProvider>{children}</_GovernanceProvider>
    </ApolloProvider>
  );
};
