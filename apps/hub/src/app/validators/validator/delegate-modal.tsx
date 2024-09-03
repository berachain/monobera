import { PropsWithChildren, useState } from "react";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Address } from "viem";

import { DelegateContent } from "./delegate-content";

export const DelegateModal = ({ validator }: { validator: Address }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Delegate</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full md:w-[550px]">
          <DelegateContent validator={validator} />
        </DialogContent>
      </Dialog>
    </>
  );
};
