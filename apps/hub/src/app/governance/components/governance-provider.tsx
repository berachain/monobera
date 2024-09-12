"use client";

import { ApolloProvider } from "@apollo/client";
import { usePollProposalThreshold, usePollUserDelegates } from "@bera/berajs";
import { bgtClient } from "@bera/graphql";
import { createContext, useContext, useState } from "react";
import { Address } from "viem";
import { governorAddress as governorAddressFromEnv } from "@bera/config";
import { NotEnoughVotingPower } from "./not-enough-voting-power";
type GovernanceContextType = {
  canPropose: boolean;
  votesThreshold?: string;
  currentVotes?: string;
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

  const [isDialogOpen, setIsDialogOpen] = useState<{
    isOpen: boolean;
    onClose: () => void;
  }>({
    isOpen: false,
    onClose: () => {},
  });

  const { data: voteData } = usePollUserDelegates();
  const { data: votesThresholdData } = usePollProposalThreshold(
    governorAddress!,
  );

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
          canPropose:
            !!voteData &&
            !!votesThresholdData &&
            Number(voteData.currentVotes) >=
              Number(votesThresholdData.votesThreshold),
          votesThreshold: votesThresholdData?.votesThreshold,
          currentVotes: voteData?.currentVotes,
        } as GovernanceContextType
      }
    >
      <NotEnoughVotingPower
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
