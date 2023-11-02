import { ActionButton } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";

export function OctGenerateDialog({
  open,
  isLoading,
  onOpenChange,
  onGenerate,
}: {
  open: boolean;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex w-full flex-col gap-4 p-4 md:w-[382px]">
        <div className="text-xl font-semibold leading-7">
          ⚡ Setup One Click Trading{" "}
        </div>
        <div className="text-sm font-normal leading-5 text-muted-foreground">
          Eliminate the need to manually interact with your wallet while
          trading. Enjoy a seamless trading experience.
        </div>
        <div className="text-sm font-normal leading-5 text-muted-foreground">
          Here are the three simple steps you need to complete:
        </div>
        <div className="flex flex-col gap-1">
          <ul className="mx-4 flex list-disc flex-col gap-2 self-center">
            <div>
              <li className="text-sm font-bold">Generate a Wallet:</li>
              <div className="text-sm font-normal leading-5 text-muted-foreground">
                Create a new 1CT wallet that is stored securely on your device.
              </div>
            </div>
            <div>
              <li className="text-sm font-bold">Fund Gas:</li>
              <div className="text-sm font-normal leading-5 text-muted-foreground">
                Transfer gas funds from your connected wallet to your 1CT wallet
                so you can place transactions.
              </div>
            </div>
            <div>
              <li className="text-sm font-bold">Delegate:</li>
              <div className="text-sm font-normal leading-5 text-muted-foreground">
                Grant your connected wallet permission to interact with trading
                contracts through the 1-CT wallet.
              </div>
            </div>
          </ul>
        </div>

        <ActionButton>
          <Button
            disabled={isLoading}
            className="w-full"
            onClick={() => {
              onGenerate();
            }}
          >
            Sign to Generate 1-CT Wallet
          </Button>
        </ActionButton>
      </DialogContent>
    </Dialog>
  );
}
