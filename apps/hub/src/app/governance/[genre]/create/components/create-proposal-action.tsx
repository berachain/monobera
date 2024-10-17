import { Dropdown } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  CustomProposalActionErrors,
  ProposalAction,
  ProposalTypeEnum,
} from "~/app/governance/types";
import { UpdateFriendsOfChef } from "./update-friends-of-chef";
import { CustomAction } from "./custom-action";
import { usePrevious } from "@bera/berajs";
import { Erc20Transfer } from "./erc20-transfer";

export const CreateProposalAction = ({
  action,
  setAction,
  errors = {},
  onDestroy,
  setErrors,
  idx,
}: {
  idx: number;
  onDestroy: () => void;
  action: ProposalAction;
  errors: CustomProposalActionErrors;
  setErrors: Dispatch<SetStateAction<CustomProposalActionErrors>>;
  setAction: Dispatch<SetStateAction<ProposalAction>>;
}) => {
  const prevAction: ProposalAction | undefined = usePrevious(action);

  useEffect(() => {
    if (prevAction?.type && action.type !== prevAction?.type) {
      setAction((prev) => ({ type: action.type, calldata: [], target: "" }));
    }
  }, [action, prevAction]);

  return (
    <div className="grid grid-cols-1 gap-y-6 pb-6 mb-6 border-border border-b">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold leading-tight flex items-center justify-between">
          <label>Action {1 + idx}</label>
          <Button
            variant="link"
            size="sm"
            className={cn(
              "text-destructive-foreground",
              idx === 0 && "invisible pointer-events-none",
            )}
            onClick={onDestroy}
          >
            Remove action
          </Button>
        </div>
        <Dropdown
          sortby={false}
          className="!w-full !grow"
          triggerClassName="!w-full grow justify-between"
          contentClassname="!w-full !grow"
          selectionList={[
            {
              value: ProposalTypeEnum.CUSTOM_PROPOSAL,
              label: "Custom Action",
            },
            {
              value: ProposalTypeEnum.UPDATE_REWARDS_GAUGE,
              label: "Update Rewards Vault",
            },
            // { // TODO add wen we have the treasury contract
            //   value: ProposalTypeEnum.ERC20_TRANSFER,
            //   label: "Transfer ERC20 Tokens",
            // },
          ]}
          selected={action.type}
          onSelect={(v) =>
            setAction((a) => ({
              ...a,
              type: v as ProposalTypeEnum.CUSTOM_PROPOSAL,
            }))
          }
        />
      </div>
      {action.type === ProposalTypeEnum.CUSTOM_PROPOSAL && (
        <CustomAction
          errors={errors}
          setErrors={setErrors}
          action={action}
          setAction={setAction}
          idx={idx}
        />
      )}
      {action.type === ProposalTypeEnum.UPDATE_REWARDS_GAUGE && (
        <UpdateFriendsOfChef
          errors={errors}
          action={action}
          setAction={setAction}
        />
      )}
      {action.type === ProposalTypeEnum.ERC20_TRANSFER && (
        <Erc20Transfer
          idx={idx}
          action={action}
          setAction={setAction}
          errors={errors}
          setErrors={setErrors}
        />
      )}
    </div>
  );
};
