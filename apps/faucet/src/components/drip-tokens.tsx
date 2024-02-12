import React, { useEffect } from "react";
import { faucetEndpointUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { getAddress, isAddress } from "viem";

export function DripToken({
  address,
  setAlert,
  setShowAlert,
}: {
  address: string;
  setAlert: (alert: "success" | "destructive" | "error" | undefined) => void;
  setShowAlert: () => void;
}) {
  const [height, setHeight] = React.useState<number | undefined>(undefined);
  useEffect(() => {
    const item = document.getElementById("cf-turnstile")?.offsetHeight;
    setHeight(item);
  }, []);

  async function handleRequest(token: string) {
    try {
      const res = await fetch(
        `${faucetEndpointUrl}/api/claim?address=${getAddress(address)}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ address: getAddress(address) }),
        },
      );
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

  function onsubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowAlert();
    const formData = new FormData(e.target as HTMLFormElement);
    const token = formData.get("cf-turnstile-response") as string;
    if (token) void handleRequest(token);
    else setAlert("error");
  }

  return (
    <form onSubmit={onsubmit}>
      <div
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_KEY!}
        data-theme="light"
        id="cf-turnstile"
        data-appearance="interaction-only"
      />
      <Button
        disabled={!isAddress(address ?? "") || height !== 0}
        className="mb-4 w-full"
        type="submit"
      >
        Drip Tokens
      </Button>
    </form>
  );
}
