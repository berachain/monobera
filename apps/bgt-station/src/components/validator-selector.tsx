import React, { useEffect, useState } from "react";
import { truncateHash, useBeraJs, usePollValidatorInfo } from "@bera/berajs";
import { SearchInput, ValidatorIcon } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { type Address } from "viem";

import { AllValidator } from "~/app/validators/components/all-validator";
import { MyValidator } from "~/app/validators/components/my-validators";

export default function ValidatorSelector({
  validatorAddress = "0x",
  onSelectValidator,
  showDelegated = false,
  filter,
  showSearch,
}: {
  validatorAddress?: Address;
  onSelectValidator?: (address: string) => void;
  showDelegated?: boolean;
  filter?: Address[];
  showSearch?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const { validatorInfoDictionary } = usePollValidatorInfo();
  //@ts-ignore
  const validValidator = validatorInfoDictionary?.[validatorAddress];

  return (
    <div>
      <Button
        variant="outline"
        className="ml-3 min-w-[148px] whitespace-nowrap border-border bg-background shadow"
        onClick={() => setOpen(true)}
      >
        {validValidator ? (
          <div className="flex items-center gap-2 text-base font-medium leading-normal">
            <ValidatorIcon
              address={validValidator.id as Address}
              className="h-8 w-8"
            />
            {validValidator.metadata?.name ?? truncateHash(validValidator.id)}
            <Icons.chevronDown className="relative h-3 w-3" />
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm font-medium leading-normal sm:text-base">
            Select Validator
            <Icons.chevronDown className="relative h-3 w-3" />
          </div>
        )}
      </Button>
      <ValidatorModal
        open={open}
        unbond={showDelegated}
        onClose={() => setOpen(false)}
        onSelect={(address) => onSelectValidator?.(address)}
        showSearch={showSearch}
      />
    </div>
  );
}

const ValidatorModal = ({
  open,
  unbond,
  showSearch,
  onClose,
  onSelect,
}: {
  open: boolean;
  unbond?: boolean;
  showSearch?: boolean;
  onClose: () => void;
  onSelect: (address: string) => void;
}) => {
  const { isReady } = useBeraJs();
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
  const [keyword, setKeyword] = useState("");
  const [showDelegated, setShowDelegated] = useState(false);

  useEffect(() => {
    return () => {
      if (typingTimer) clearTimeout(typingTimer);
    };
  }, [typingTimer]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full justify-center sm:max-w-fit">
        <div className="flex w-[100vw] flex-col gap-4 p-6 lg:w-fit">
          <div className="text-lg font-semibold leading-7">
            Validator select
          </div>

          <div className="flex items-center justify-between">
            <SearchInput
              placeholder="Search by name or address"
              className="w-full md:w-[400px]"
              value={keyword}
              onChange={(e: any) => {
                setKeyword(e.target.value);
                setIsTyping?.(true);
                if (typingTimer) clearTimeout(typingTimer);
                const newTimer = setTimeout(() => {
                  setIsTyping(false);
                }, 1000);
                setTypingTimer(newTimer);
              }}
            />
            {showDelegated ? (
              <Button
                className="w-fit whitespace-nowrap"
                size="sm"
                variant="outline"
                onClick={() => setShowDelegated(false)}
              >
                Show All Validators
              </Button>
            ) : (
              <Button
                className="w-fit whitespace-nowrap"
                size="sm"
                onClick={() => setShowDelegated(true)}
              >
                Show Delegated Only
              </Button>
            )}
          </div>

          {unbond || showDelegated ? (
            <MyValidator
              keyword={keyword}
              onRowClick={(row: any) => {
                onSelect(row.original.coinbase);
                onClose();
              }}
            />
          ) : (
            <AllValidator
              user={isReady}
              keyword={keyword}
              isTyping={isTyping}
              onRowClick={(row: any) => {
                onSelect(row.original.coinbase);
                onClose();
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
