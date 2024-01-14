import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Icons } from "@bera/ui/icons";

export default function AlertGroups({
  showAlet,
  alert,
}: {
  showAlet: boolean;
  alert: "success" | "destructive" | "error" | undefined;
}) {
  return (
    <>
      {showAlet && alert === "success" && (
        <Alert variant={"success"}>
          <AlertTitle>
            <Icons.checkCircle className="inline-block h-4 w-4" /> Request
            Submitted
          </AlertTitle>
          <AlertDescription>
            You’ll receive the testnet tokens in your wallet in about 2 minutes.
            Use your BERA to acquire a basket of other tokens from our{" "}
            <Link
              href={dexUrl}
              target="_blank"
              className="cursor-pointer underline"
            >
              DEX
            </Link>
            .
          </AlertDescription>
        </Alert>
      )}
      {showAlet && alert === "destructive" && (
        <Alert variant={"destructive"}>
          <AlertTitle>
            {" "}
            <Icons.info className="inline-block h-4 w-4" /> Wallet Grey-listed
            for 8 hours
          </AlertTitle>
          <AlertDescription>
            To ensure a sufficient balance for all users, the Faucet is set to
            dispense testnet tokens every 8 hours. Please retry in 8 hours.
          </AlertDescription>
        </Alert>
      )}
      {showAlet && alert === "error" && (
        <Alert variant={"destructive"}>
          <AlertTitle>
            {" "}
            <Icons.XOctagon className="inline-block h-4 w-4" /> Oh no!
          </AlertTitle>
          <AlertDescription>
            We are currently experiencing high traffic, causing temporary
            unavailability of our service. Please try again in a few minutes. We
            apologize for any inconvenience and appreciate your patience.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
