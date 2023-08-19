import { useState } from "react";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";

import BorrowModalContent from "./borrow-modal-content";

export default function BorrowBtn() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={"secondary"} onClick={() => setOpen(true)}>
        Borrow
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-fit p-8">
          <BorrowModalContent />
        </DialogContent>
      </Dialog>
    </>
  );
}
