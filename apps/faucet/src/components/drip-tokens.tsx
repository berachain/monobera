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
  setQueue,
}: {
  address: string;
  setAlert: (
    alert: "success" | "destructive" | "error" | "busy" | undefined,
  ) => void;
  setShowAlert: () => void;
  token?: string;
  setToken: (token: undefined | string) => void;
  setQueue: (queue: undefined | number) => void;
}) {
  async function handleRequest() {
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
        try {
          const res = await fetch("/api/get-queue/api");
          const data = await res.json();
          if (Number(data.amount) > 600) {
            setQueue(data.amount);
            setAlert("busy");
          } else {
            setQueue(undefined);
            setAlert("success");
          }
        } catch (e) {
          console.log(e);
          setAlert("success");
          setQueue(undefined);
        }
        // setAlert("success");
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
