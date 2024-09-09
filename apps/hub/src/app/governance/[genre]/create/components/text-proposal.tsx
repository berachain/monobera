import { governorAddress } from "@bera/config";
import { ActionButton } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { useCreateProposal } from "~/hooks/useCreateProposal";

export const TextProposal = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { ModalPortal, submitProposal } = useCreateProposal();
  return (
    <div>
      <ActionButton>
        <Button
          type="submit"
          className="w-full"
          onClick={submitProposal}
          disabled={title.length === 0}
        >
          Submit
        </Button>
      </ActionButton>
      {ModalPortal}
    </div>
  );
};
