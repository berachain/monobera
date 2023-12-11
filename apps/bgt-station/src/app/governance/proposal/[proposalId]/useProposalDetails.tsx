import { useState } from "react";
import { type VoteOption } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/gov";

export const useProposalDetails = () => {
	const [open, setOpen] = useState(false);
	// get voting power
	const [comment, setComment] = useState("");
	const [selected, setSelected] = useState<VoteOption | undefined>(undefined);

	const votingPower = 0;

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
