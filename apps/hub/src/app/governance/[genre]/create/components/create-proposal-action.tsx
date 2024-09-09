import { Dropdown } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Input } from "@bera/ui/input";
import { Dispatch, SetStateAction } from "react";
import {
  CustomProposalActionErrors,
  ProposalAction,
  ProposalTypeEnum,
} from "~/app/governance/types";
export const CreateProposalAction = ({
  action,
  setAction,
  errors = {},
  onDestroy,
  idx,
}: {
  idx: number;
  onDestroy: () => void;
  action: ProposalAction;
  errors: CustomProposalActionErrors;
  setAction: Dispatch<SetStateAction<ProposalAction>>;
}) => {
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
              label: "Update Rewards Gauge",
            },
          ]}
          selected={action.type}
          onSelect={(v) =>
            setAction((a) => ({ ...a, type: v as ProposalTypeEnum }))
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor={`proposal-target--${idx}`}
          className="text-sm font-semibold leading-tight"
        >
          Target Contract Address
        </label>
        <Input
          type="text"
          id={`proposal-target--${idx}`}
          placeholder="0x00000000000000"
          value={action.target}
          onChange={(e: any) =>
            setAction((prev) => ({
              ...prev,
              target: e.target.value,
            }))
          }
        />
        {errors.target && (
          <div className="text-sm text-destructive-foreground">
            * {errors.target}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor={`proposal-message--${idx}`}
          className="text-sm font-semibold leading-tight"
        >
          Enter ABI
        </label>
        <Input
          id={`proposal-message--${idx}`}
          placeholder="function balanceOf(address owner) view returns (uint256)"
          value={JSON.stringify(action.ABI)}
          onChange={(e) =>
            setAction((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </div>
    </div>
  );
};
