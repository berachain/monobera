import React from "react";
import { faucetEndpointUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { getAddress, isAddress } from "viem";

import ReCAPTCHAButton from "./recaptcha-btn";

export function DripToken({
  address,
  setAlert,
  setShowAlert,
  twitterId,
}: {
  address: string;
  setAlert: (alert: number | undefined) => void;
  setShowAlert: () => void;
  twitterId: string;
}) {
  const [token, setToken] = React.useState<string | undefined>(undefined);

  async function handleRequest() {
    try {
      const res = await fetch(`${faucetEndpointUrl}/api/claim`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          address: getAddress(address),
          tweetId: twitterId,
        }),
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
      setToken("");
    }
    setShowAlert();
  }

  return (
    <>
      {!token ? (
        <ReCAPTCHAButton setToken={setToken} />
      ) : (
        <Button
          disabled={!isAddress(address ?? "")}
          onClick={() => {
            void handleRequest();
          }}
          className="w-full"
        >
          Drip Tokens
        </Button>
      )}
    </>
  );
}
