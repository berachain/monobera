"use client";
import { useRouter } from "next/navigation";
import { GOVERNANCE_ABI, TransactionActionType } from "@bera/berajs";
import { governorAddress } from "@bera/config";
import { useTxn } from "@bera/shared-ui";
import {
  Address,
  encodeAbiParameters,
  encodeFunctionData,
  parseAbi,
  parseAbiItem,
} from "viem";
import { useCallback, useState } from "react";
import {
  CustomProposal,
  ProposalAction,
  ProposalTypeEnum,
} from "~/app/governance/types";

const defaultAction = {
  type: ProposalTypeEnum.CUSTOM_PROPOSAL,
  target: undefined,
  ABI: undefined,
  functionName: "",
  calldata: [],
  gauge: undefined,
  receiptToken: undefined,
  isFriend: true,
};
export const useCreateProposal = () => {
  const [proposal, setProposal] = useState<CustomProposal>({
    title: "",
    description: "",
    forumLink: "",
    actions: [defaultAction],
  });

  const router = useRouter();

  const { write, ModalPortal } = useTxn({
    message: "Submit Proposal",
    actionType: TransactionActionType.SUBMIT_PROPOSAL,
    onSuccess: () => router.push("/governance"),
  });

  const addProposalAction = useCallback(() => {
    setProposal((p) => ({ ...p, actions: [...p.actions, defaultAction] }));
  }, []);

  const removeProposalAction = useCallback(
    (idx: number) => {
      setProposal((p) => {
        const actions = [...p.actions];
        actions.splice(idx, 1);
        return { ...p, actions };
      });
    },
    [setProposal],
  );

  const submitProposal = useCallback(() => {
    const actions = proposal.actions.map((action) => {
      switch (action.type) {
        case ProposalTypeEnum.CUSTOM_PROPOSAL:
          if (!action.target || !action.ABI) {
            throw new Error("Invalid action");
          }
          // biome-ignore lint/correctness/noSwitchDeclarations: will return before the next case
          const abi = parseAbiItem(action.ABI);

          // console.log(ProposalTypeEnum.CUSTOM_PROPOSAL, {
          //   abi,
          //   abiItem: parseAbiItem(action.ABI),
          // });

          encodeFunctionData({
            abi: [abi],
            // functionName: action.functionName,
            args: action.calldata,
          });

          return;

        default:
          break;
      }
    });
    write({
      address: governorAddress,
      abi: GOVERNANCE_ABI,
      functionName: "propose",
      params: [
        proposal.actions.map((action) => action.target),
        [0],
        ["0x"],
        // TODO: add forum link
        `# ${proposal.title}\n${proposal.description}`,
      ],
    });
  }, [proposal]);

  return {
    proposal,
    setProposal,
    ModalPortal,
    submitProposal,
    addProposalAction,
    removeProposalAction,
  };
};
