import { faucetEndpointUrl } from "@bera/config";
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
      const res = await fetch(`${faucetEndpointUrl}/api/claim`, {
        method: "POST",
        body: JSON.stringify({ address: getAddress(address) }),
      });
      console.log(res);
      if (res.status === 200) {
        setAlert("success");
      } else if (res.status === 429) {
        setAlert("destructive");
      } else {
        setAlert("error");
      }
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
