import { useState } from "react";
import { usePollTotalDelegatorDelegated } from "@bera/berajs";
import { type VoteOption } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/gov";

export const useProposalDetails = () => {
  const [open, setOpen] = useState(false);
  // get voting power
  const [comment, setComment] = useState("");
  const [selected, setSelected] = useState<VoteOption | undefined>(undefined);

  const { usePercentageVotingPower } = usePollTotalDelegatorDelegated();
  const votingPower = usePercentageVotingPower();

  return {
    open,
    setOpen,
    votingPower,
    comment,
    setComment,
    selected,
    setSelected,
  };
};
