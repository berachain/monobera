import { useState } from "react";
import { SubgraphUserValidator } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Address } from "viem";

import { UnDelegateContent } from "./undelegate-content";

export const UnbondModal = ({
  userValidator,
}: {
  userValidator: SubgraphUserValidator;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setOpen(true)}
        disabled={Number(userValidator.amountDeposited) <= 0}
      >
        Unbond
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full md:w-[550px]">
          <UnDelegateContent userValidator={userValidator} />
        </DialogContent>
      </Dialog>
    </>
  );
};
