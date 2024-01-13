import React from "react";
import { faucetEndpointUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { getAddress, isAddress } from "viem";

export function DripToken({
  address,
  setAlert,
  setShowAlert,
  token,
  setToken,
}: {
  address: string;
  setAlert: (alert: "success" | "destructive" | "error" | undefined) => void;
  setShowAlert: () => void;
  token?: string;
  setToken: (token: undefined | string) => void;
}) {
  async function handleRequest() {
    try {
      const res = await fetch(`${faucetEndpointUrl}/api/claim?address=${getAddress(address)}`, {
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
    setToken(undefined);
  }
  return (
    <Button
      disabled={!isAddress(address ?? "") || !token}
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
