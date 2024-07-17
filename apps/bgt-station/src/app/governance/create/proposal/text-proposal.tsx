import { governorAddress } from "@bera/config";
import { ActionButton } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";

import { useCreateProposal } from "../useCreateProposal";

export const TextProposal = ({ description }: { description: string }) => {
  const { ModalPortal, submitProposal } = useCreateProposal([
    [governorAddress],
    [0],
    ["0x"],
    description,
  ]);
  return (
    <div>
      <ActionButton>
        <Button type="submit" className="w-full" onClick={submitProposal}>
          Submit
        </Button>
      </ActionButton>
      {ModalPortal}
    </div>
  );
};
