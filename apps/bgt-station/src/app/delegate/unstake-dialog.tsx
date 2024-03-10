"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";

import { DelegateEnum } from "./types";

interface Props {
  setActiveAction: (action: DelegateEnum) => void;
}

export function UnstakeDialog({ setActiveAction }: Props) {
  const [open, setOpen] = useState(true);

  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="items-center justify-center text-center text-xl font-semibold">
            Are you sure <br />
            you want to redeem?
          </div>
          <div className="flex items-center justify-center text-center text-sm font-medium text-muted-foreground">
            Redeeming BGT will convert it to BERA, this is a irreversible
            action.
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <Button
              className="w-full"
              variant="success"
              onClick={async () => {
                setActiveAction(DelegateEnum.REDELEGATE);
                await router.push("/delegate?action=redelegate");
                setOpen(false);
              }}
            >
              Restake my BGT
            </Button>
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => setOpen(false)}
            >
              Continue with BGT redemption
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
