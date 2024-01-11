import { faucetEndpointUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { getAddress, isAddress } from "viem";

export function DripToken({
  address,
  setAlert,
  setShowAlert,
  token,
}: {
  address: string;
  setAlert: (alert: "success" | "destructive" | "error" | undefined) => void;
  setShowAlert: () => void;
  token?: string;
}) {
  async function handleRequest() {
    try {
      const res = await fetch(`${faucetEndpointUrl}/api/claim`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ address: getAddress(address) }),
      });
      if (res.status === 200) {
        setAlert("success");
      } else if (res.status === 429) {
        setAlert("destructive");
      } else {
        setAlert("error");
      }
    } catch (error: any) {
      setAlert("error");
    }
  }
  return (
    <Button
      disabled={!isAddress(address ?? "")}
      onClick={() => {
        setShowAlert();
        void handleRequest();
      }}
      className="w-full"
    >
      Drip Tokens
    </Button>
  );
}
