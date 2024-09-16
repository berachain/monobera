"use client";
import { useRouter } from "next/navigation";
import {
  BERA_CHEF_ABI,
  GOVERNANCE_ABI,
  TransactionActionType,
} from "@bera/berajs";
import { useTxn } from "@bera/shared-ui";
import {
  Address,
  encodeFunctionData,
  erc20Abi,
  isAddress,
  parseAbiItem,
} from "viem";
import { useCallback, useState } from "react";
import {
  CustomProposal,
  CustomProposalActionErrors,
  CustomProposalErrors,
  ProposalErrorCodes,
  ProposalTypeEnum,
  SafeProposalAction,
} from "~/app/governance/types";

const defaultAction = {
  type: ProposalTypeEnum.CUSTOM_PROPOSAL,
  target: "",
  ABI: "",
  functionSignature: "",
  calldata: [],
} satisfies SafeProposalAction;

export const checkProposalField = (
  fieldOrType:
    | "address"
    | "abi"
    | "bool"
    | `uint${string}`
    | `int${string}`
    | "action"
    | "title"
    | "description"
    | "forumLink",
  value: any,
  required = true,
): ProposalErrorCodes | null => {
  if (required && !value) {
    return ProposalErrorCodes.REQUIRED;
  }

  if (fieldOrType.startsWith("uint") || fieldOrType.startsWith("int")) {
    if (typeof value !== "string") {
      return ProposalErrorCodes.INVALID_AMOUNT;
    }

    try {
      const valueBN = BigInt(value);
      if (fieldOrType.startsWith("uint")) {
        if (valueBN < 0n) {
          return ProposalErrorCodes.NEGATIVE_AMOUNT;
        }
      }
    } catch (error) {
      return ProposalErrorCodes.INVALID_AMOUNT;
    }
    return null;
  }

  switch (fieldOrType) {
    case "bool":
      // if (value !== "true" && value !== "false") {
      //   return ProposalErrorCodes.INVALID_AMOUNT;
      // }
      return null;

    case "title":
      if (value.length === 0) {
        return ProposalErrorCodes.REQUIRED;
      }
      return null;

    case "description":
      if (value.length === 0) {
        return ProposalErrorCodes.REQUIRED;
      }
      return null;

    case "forumLink":
      if (value.length === 0) {
        return ProposalErrorCodes.REQUIRED;
      }

      if (!URL.canParse(value)) {
        return ProposalErrorCodes.INVALID_ADDRESS;
      }

      if (!value.startsWith("https://")) {
        return ProposalErrorCodes.INVALID_ADDRESS;
      }
      return null;

    case "address":
      if (!isAddress(value, { strict: true })) {
        return ProposalErrorCodes.INVALID_ADDRESS;
      }
      return null;

    case "abi":
      try {
        JSON.parse(value);
      } catch (error) {
        return ProposalErrorCodes.INVALID_ABI;
      }
      return null;

    case "action":
      if (!isAddress(value, { strict: true })) {
        return ProposalErrorCodes.INVALID_ADDRESS;
      }
      return null;

    default:
      throw new Error(`Invalid field or type: ${fieldOrType}`);
  }
};

export const getBodyErrors = (proposal: CustomProposal) => {
  const e: CustomProposalErrors = {};
  e.title = checkProposalField("title", proposal.title);
  e.description = checkProposalField("description", proposal.description);
  e.forumLink = checkProposalField("forumLink", proposal.forumLink);

  return e;
};

export const useCreateProposal = (governorAddress: Address) => {
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

  const submitProposal = useCallback(
    ({
      onError,
    }: {
      onError?: (e: CustomProposalErrors) => void;
    }) => {
      const e: CustomProposalErrors = getBodyErrors(proposal);

      const actions: Address[] = [];

      e.actions = proposal.actions
        .map((action, idx): CustomProposalActionErrors => {
          const errors: CustomProposalActionErrors = {};
          errors.target = checkProposalField("address", action.target);

          if (action.type === ProposalTypeEnum.CUSTOM_PROPOSAL) {
            errors.ABI = checkProposalField("abi", action.ABI);
            if (!action.functionSignature) {
              errors.functionSignature = ProposalErrorCodes.REQUIRED;
            } else {
              try {
                const parsedSignatureAbi = parseAbiItem(
                  action.functionSignature,
                );
                if (parsedSignatureAbi.type !== "function") {
                  errors.functionSignature = ProposalErrorCodes.INVALID_ABI;
                } else {
                  errors.calldata = parsedSignatureAbi.inputs.map(
                    (input, index) => {
                      try {
                        return checkProposalField(
                          // @ts-expect-error this is not typed, will throw if not valid
                          input.type,
                          action.calldata?.[index],
                        );
                      } catch (error) {
                        return null;
                      }
                    },
                  );

                  actions[idx] = encodeFunctionData({
                    abi: [parsedSignatureAbi],
                    args: action.calldata,
                  });
                }
              } catch (error) {
                errors.functionSignature = ProposalErrorCodes.INVALID_ABI;
              }
            }
          } else if (action.type === ProposalTypeEnum.UPDATE_REWARDS_GAUGE) {
            errors.vault = checkProposalField("address", action.vault);
            errors.isFriend = null; //checkProposalField("bool", action.isFriend);
            if (!errors.vault) {
              actions[idx] = encodeFunctionData({
                abi: BERA_CHEF_ABI,
                functionName: "updateFriendsOfTheChef",
                args: [action.vault!, !!action.isFriend!],
              });
            }
          } else if (action.type === ProposalTypeEnum.ERC20_TRANSFER) {
            errors.amount = checkProposalField("uint256", action.amount);
            errors.to = checkProposalField("address", action.to);
            if (!errors.amount && !errors.to) {
              actions[idx] = encodeFunctionData({
                abi: erc20Abi,
                functionName: "transfer",
                args: [action.to!, BigInt(action.amount!)],
              });
            }
          }
          return errors;
        })
        .filter((e) =>
          Object.values(e).some((v) => {
            if (Array.isArray(v)) {
              return v.filter((v) => v).length > 0;
            }

            return !!v;
          }),
        );

      if (
        Object.getOwnPropertyNames(e)
          .map((name) => e[name as keyof typeof e])
          .some((v) => {
            if (Array.isArray(v)) {
              return v.length > 0;
            }

            return !!v;
          })
      ) {
        console.warn("Proposal has errors", e);
        onError?.(e);
        return;
      }

      if (actions.length === 0) {
        throw new Error("No actions submitted in proposal");
      }

      write({
        address: governorAddress,
        abi: GOVERNANCE_ABI,
        functionName: "propose",
        params: [
          proposal.actions.map((action) => action.target),
          proposal.actions.map(() => 0n),
          actions,
          // TODO: add forum link
          `# ${proposal.title}\n${proposal.description}`,
        ],
      });
    },
    [proposal],
  );

  return {
    proposal,
    setProposal,
    ModalPortal,
    submitProposal,
    addProposalAction,
    removeProposalAction,
  };
};
