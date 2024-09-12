import { Token, truncateHash, usePollBalance } from "@bera/berajs";
import { TokenInput } from "@bera/shared-ui";
import { InputWithLabel } from "@bera/ui/input";
import { Label } from "@bera/ui/label";
import { FormError } from "@bera/ui/form-error";
import { Dispatch, SetStateAction, useState } from "react";
import {
  CustomProposalActionErrors,
  ProposalAction,
  ProposalTypeEnum,
} from "~/app/governance/types";
import { useGovernance } from "~/app/governance/components/governance-provider";

export function Erc20Transfer({
  idx,
  action,
  setAction,
  errors,
  setErrors,
}: {
  idx: number;
  action: ProposalAction & { type: ProposalTypeEnum.ERC20_TRANSFER };
  errors: CustomProposalActionErrors;
  setAction: Dispatch<SetStateAction<ProposalAction>>;
  setErrors: Dispatch<SetStateAction<CustomProposalActionErrors>>;
}) {
  const { governorAddress } = useGovernance();
  const [selectedToken, setSelectedToken] = useState<Token | undefined>(
    undefined,
  );
  const { data: balance } = usePollBalance({
    address: selectedToken?.address,
    owner: governorAddress,
  });

  const [warning, setWarning] = useState<string | undefined>(undefined);

  return (
    <div className="grid grid-cols-1 gap-6">
      <InputWithLabel
        type="text"
        variant="black"
        label="Enter Recipient"
        error={errors.to}
        id={`proposal-to--${idx}`}
        placeholder={truncateHash("0x00000000000000")}
        value={action.to}
        onChange={(e: any) =>
          setAction((prev) => ({
            ...prev,
            to: e.target.value,
          }))
        }
      />
      <div className="grid grid-cols-1 gap-y-2">
        <Label>Transfer Amount</Label>
        <TokenInput
          className="p-4 border border-border rounded-sm"
          selected={selectedToken}
          amount={action.amount}
          forceShowBalance
          hidePrice
          // hideBalance
          balance={balance?.formattedBalance}
          // showExceeding={true}
          // setIsTyping={(isTyping: boolean) => setIsTyping(isTyping)}
          onExceeding={(isExceeding: boolean) =>
            setWarning(
              isExceeding
                ? "This amount is greater than DAO balance. You can submit a proposal but it will fail if the balance is not enough at execution."
                : undefined,
            )
          }
          setAmount={(amount) => {
            setAction({ ...action, amount });
          }}
          onTokenSelection={(token) => {
            setSelectedToken(token);
            setAction({ ...action, target: token?.address });
          }}
          filteredSymbols={["BGT"]}
        />
        <FormError>{errors.target || errors.amount}</FormError>
        {warning && (
          <div className="text-warning-foreground text-sm leading-tight">
            {warning}
          </div>
        )}
      </div>
    </div>
  );
}
