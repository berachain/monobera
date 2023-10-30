import { faucetUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { getAddress, isAddress } from "viem";

export function DripToken({ address }: { address: string }) {
  async function handleRequest() {
    // if (address.endsWith(".eth")) {
    //   try {
    // const provider = new CloudflareProvider();
    // address = await provider.resolveName(address);
    //     if (!address) {
    //     //   toast({ message: "invalid ENS name", type: "is-warning" });
    //       console.log("invalid ENS name")
    //       return;
    //     }
    //   } catch (error) {
    //     // toast({ message: error.reason, type: "is-warning" });
    //     console.log(error.message)
    //     return;
    //   }S
    // }

    try {
      const res = await fetch(`${faucetUrl}/api/claim`, {
        method: "POST",
        body: JSON.stringify({ address: getAddress(address) }),
      });
      // const res = await fetch(`${faucetUrl}/api/info`);
      const result = await res.json();
      const type = res.ok ? "is-success" : "is-warning";
      console.log(result, type);
    } catch (error: any) {
      console.log(error, error.message);
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
