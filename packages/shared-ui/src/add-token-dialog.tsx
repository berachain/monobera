import { Token } from "@bera/berajs";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import Balancer from "react-wrap-balancer";
import { TokenIcon } from "./token-icon";

export interface AddTokenDialogProps {
  token: Token | undefined;
  onAddToken: (token: Token) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const AddTokenDialog = ({
  token,
  onAddToken,
  open,
  onOpenChange,
}: AddTokenDialogProps) => {
  if (!token) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[100vh] flex-col items-center justify-center gap-3 px-4  md:w-[350px]">
        <Icons.tooltip
          style={{ height: "64px", width: "64px", color: "#DC2626" }}
        />
        <p className="text-lg font-semibold">Import token</p>
        <Balancer className="text-center text-xs font-medium text-muted-foreground">
          {`This token doesn't appear on the active token list(s). Anyone can
            create a token, including creating fake versions of existing tokens
            that claim to represent projects`}
        </Balancer>
        <div className="flex w-full flex-col items-center gap-2 rounded-lg bg-muted p-2">
          <TokenIcon address={token?.address ?? ""} />
          <h4 className="text-sm font-semibold">{token?.name}</h4>
          <Balancer className="text-xs font-normal text-muted-foreground">
            {token?.address}
          </Balancer>
          <Badge variant="destructive" className="w-fit gap-1">
            <Icons.tooltip className="h-4 w-4" />
            Unknown source
          </Badge>
        </div>

        <Button onClick={() => onAddToken(token)} className="w-full">
          Import
        </Button>
      </DialogContent>
    </Dialog>
  );
};
