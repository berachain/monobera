import { useState } from "react";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";

import SupplyModalContent from "./modals/supply-modal-content";

export default function SupplyBtn() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.plusCircle className="mr-2" /> Supply
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-fit p-8">
          <SupplyModalContent />
        </DialogContent>
      </Dialog>
    </>
  );
}
