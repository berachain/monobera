import { faucetUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { getAddress, isAddress } from "viem";

export function DripToken({
  address,
  setAlert,
}: {
  address: string;
  setAlert: (alert: "success" | "destructive" | "error" | undefined) => void;
}) {
  async function handleRequest() {
    try {
      const res = await fetch(`${faucetUrl}/api/claim`, {
        method: "POST",
        body: JSON.stringify({ address: getAddress(address) }),
      });
      res.ok ? setAlert("success") : setAlert("destructive");
    } catch (error: any) {
      setAlert("error");
      // console.log(error, error.message);
    }
  }
  return (
    <Button
      disabled={!isAddress(address ?? "")}
      onClick={() => handleRequest()}
    >
      Drip Tokens
    </Button>
  );
}
