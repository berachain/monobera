import { useEffect, useState } from "react";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import TwitterJump from "./twitter-jump";
import TwitterSignInButton from "./twitter-sign-in-btn";

export default function TwitterDialog({
  settwitterId,
  twitterSignedIn,
  ...props
}: {
  settwitterId: (twitterId: string | undefined) => void;
  twitterSignedIn: boolean;
  setTwitterSignedIn: (twitterSignedIn: boolean) => void;
  setTwitterAccessToken: (token: string) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [link, setLink] = useState<string | undefined>(undefined);
  const [bid, setBid] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchGid = async () => {
      if (!bid) {
        const response = await fetch("/api/get-bid/api");
        const data = await response.json();
        setBid(data.bid);
      }
    };
    if (open && !bid) {
      void fetchGid();
    } else if (!open) {
      setBid(undefined);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(!open)}>Drip Token</Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="mb-3 flex flex-col gap-2">
            Verify Twitter
          </DialogTitle>

          <div>
            <div className="text-lg uppercase">Step 1</div>
            <div className="mb-1">
              Please click this button below and tweet a verification message on
              Twitter
            </div>
            <TwitterSignInButton twitterSignedIn={twitterSignedIn} {...props} />
          </div>
          <br />
          <div>
            <div className="text-lg uppercase">Step 2</div>
            <div className="mb-1">
              Please click this button below and tweet a verification message on
              Twitter
            </div>
            <TwitterJump bid={bid} disabled={!twitterSignedIn} />
          </div>
          <br />
          <div>
            <div className="text-lg uppercase">Step 3</div>
            <div className="mb-1">
              On your tweet, find the share button. Copy link and paste it here.
              Click the button to verify your account
            </div>
            <div className="flex items-center gap-4">
              <Input
                startAdornment={<Icons.twitter className="mr-2" />}
                placeholder="Paste link here"
                className="pl-10"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <Button
                onClick={() => {
                  try {
                    const twitterId = link.split("/")[5].split("?")[0];
                    settwitterId(twitterId);
                  } catch (error) {
                    settwitterId(undefined);
                  }
                }}
              >
                Submit
              </Button>
            </div>
          </div>
          <br />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
