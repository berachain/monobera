import React from "react";
import { faucetEndpointUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { useSession } from "next-auth/react";
import { getAddress, isAddress } from "viem";

import ReCAPTCHAButton from "./recaptcha-btn";

export function DripToken({
  alert,
  address,
  setAlert,
  setShowAlert,
  twitterId,
}: {
  alert: number | undefined;
  address: string;
  setAlert: (alert: number | undefined) => void;
  setShowAlert: () => void;
  twitterId: string;
}) {
  const { data } = useSession();

  const [CAPTCHAtoken, setCAPTCHAtoken] = React.useState<string | undefined>(
    undefined,
  );

  async function handleRequest() {
    try {
      const res = await fetch(`${faucetEndpointUrl}/api/claim`, {
        method: "POST",
        headers: { Authorization: `Bearer ${CAPTCHAtoken}` },
        body: JSON.stringify({
          address: getAddress(address),
          tweetId: twitterId,
          access_token: data!.access_token,
        }),
      });

      setAlert(res.status);
    } catch (error: any) {
      setAlert(500);
      setCAPTCHAtoken("");
    }
    setShowAlert();
  }

  return (
    <>
      {!token ? (
        <ReCAPTCHAButton setToken={CAPTCHAtoken} />
      ) : (
        <Button
          disabled={!isAddress(address ?? "") || alert !== undefined}
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
