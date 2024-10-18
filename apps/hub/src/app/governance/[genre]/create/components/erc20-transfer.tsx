import { Token, truncateHash, usePollBalance, useTokens } from "@bera/berajs";
import { TokenInput } from "@bera/shared-ui";
import { InputWithLabel } from "@bera/ui/input";
import { Label } from "@bera/ui/label";
import { FormError } from "@bera/ui/form-error";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CustomProposalActionErrors,
  ProposalAction,
  ProposalErrorCodes,
  ProposalTypeEnum,
} from "~/app/governance/types";
import { formatUnits, parseUnits } from "viem";
import { checkProposalField } from "~/hooks/useCreateProposal";
import { useGovernance } from "../../components/governance-provider";

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
  const { data: tokens } = useTokens();
  const [selectedToken, setSelectedToken] = useState<Token | undefined>(
    tokens?.tokenList?.find((token) => token.address === action.target),
  );
  const { data: balance } = usePollBalance({
    address: selectedToken?.address,
    owner: governorAddress,
  });

  const [amount, setAmount] = useState<string>(
    formatUnits(BigInt(action.amount ?? "0"), selectedToken?.decimals ?? 18),
  );

  useEffect(() => {
    setAction((prev) => ({
      ...prev,
      amount: parseUnits(
        amount ?? "0",
        selectedToken?.decimals ?? 18,
      ).toString(),
    }));
  }, [amount, selectedToken?.decimals]);

  const [warning, setWarning] = useState<string | undefined>(undefined);

  return (
    <div className="grid grid-cols-1 gap-6">
      <InputWithLabel
        type="text"
        variant="black"
        label="Enter Recipient"
        error={
          errors.to === ProposalErrorCodes.REQUIRED
            ? "Recipient must be filled"
            : errors.to === ProposalErrorCodes.INVALID_ADDRESS
              ? "Invalid recipient address"
              : errors.to
        }
        id={`proposal-to--${idx}`}
        placeholder={truncateHash("0x00000000000000")}
        value={action.to}
        onChange={(e: any) => {
          const value = e.target.value;

          setErrors((prev) => ({
            ...prev,
            to: checkProposalField("address", value),
          }));

          setAction((prev) => ({
            ...prev,
            to: e.target.value,
          }));
        }}
      />
      <div className="grid grid-cols-1 gap-y-2">
        <Label>Transfer Amount</Label>
        <TokenInput
          className="p-4 border border-border rounded-sm"
          selected={selectedToken}
          amount={amount}
          // TODO: balance won't be on the governance contract.
          // the contract that will hold tokens is still TBD
          walletAddress={governorAddress}
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
            setAmount(amount);
          }}
          onTokenSelection={(token) => {
            if (token) {
              setSelectedToken(token);
              setAction((action) => ({ ...action, target: token?.address }));
            }
          }}
          filteredSymbols={["BGT"]}
        />
        <FormError>
          {errors.target === ProposalErrorCodes.REQUIRED
            ? "A Token Must Be Chosen"
            : errors.amount === ProposalErrorCodes.REQUIRED
              ? "Amount must be filled"
              : errors.amount === ProposalErrorCodes.INVALID_AMOUNT
                ? "Invalid amount."
                : errors.amount}
        </FormError>
        {warning && (
          <div className="text-warning-foreground text-sm leading-tight">
            {warning}
          </div>
        )}
      </div>
    </div>
  );
}
