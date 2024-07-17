import { useRouter } from "next/navigation";
import { GOVERNANCE_ABI, TransactionActionType } from "@bera/berajs";
import { governorAddress } from "@bera/config";
import { useTxn } from "@bera/shared-ui";
import { Address } from "viem";

export const useCreateProposal = (
  payload: [Address[], number[], string[], string],
) => {
  const router = useRouter();

  const { write, ModalPortal } = useTxn({
    message: "Submit Proposal",
    actionType: TransactionActionType.SUBMIT_PROPOSAL,
    onSuccess: () => router.push("/governance"),
  });

  const submitProposal = () =>
    write({
      address: governorAddress,
      abi: GOVERNANCE_ABI,
      functionName: "propose",
      params: payload,
    });

  return {
    ModalPortal,
    submitProposal,
  };
};
