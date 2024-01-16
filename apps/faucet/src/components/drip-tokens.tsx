import React from "react";
import { faucetEndpointUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { useSession } from "next-auth/react";
import { getAddress, isAddress } from "viem";
import CryptoJS from "crypto-js";
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
      const iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_IV).toString();
      var key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_ENCRYPTION_KEY??"");
      const encryptedAccessToken = CryptoJS.AES.encrypt(data!.access_token, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
      const res = await fetch(`${faucetEndpointUrl}/api/claim`, {
        method: "POST",
        headers: { Authorization: `Bearer ${CAPTCHAtoken}` },
        body: JSON.stringify({
          address: getAddress(address),
          tweetId: twitterId,
          accessToken: encryptedAccessToken,
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
      {!CAPTCHAtoken ? (
        <ReCAPTCHAButton setToken={setCAPTCHAtoken} />
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
