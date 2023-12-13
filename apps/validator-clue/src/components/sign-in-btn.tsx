import * as React from "react";
import { useBeraJs, useChainId } from "@bera/berajs";
import { validatorClueEndpoint } from "@bera/config";
import { Button } from "@bera/ui/button";
import { SiweMessage } from "siwe";
import { useLocalStorage } from "usehooks-ts";
import { useSignMessage } from "wagmi";

export function SignInButton() {
  const { account } = useBeraJs();
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [allowed, setAllowed] = React.useState<boolean>(true);
  const [_, setAuthToken] = useLocalStorage<{ token: string; address: string }>(
    "VALCLUE_AUTH_TOKEN",
    { token: "", address: "" },
  );

  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch(`/api/nonce`);
      return await nonceRes.json();
    } catch (error) {
      console.error("Somethings wrong with fecthing nonce:", error);
      return undefined;
    }
  };

  React.useEffect(() => {
    setAllowed(true);
    setAuthToken({ token: "", address: "" });
  }, [account]);
  
  const signIn = async () => {
    setLoading(true);
    try {
      const nonce = await fetchNonce();
      const message = new SiweMessage({
        domain: window.location.host,
        address: account,
        statement: "Validator clue sign in.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: nonce,
      });
      const preparedMessage = message.prepareMessage();
      const signature = await signMessageAsync({
        message: preparedMessage,
      });
      const verifyRes = await fetch(
        `${validatorClueEndpoint}/api/v1/auth/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: preparedMessage, signature }),
        },
      );
      const verify = await verifyRes.json();
      if (verifyRes.status === 200 && verify.token) {
        setAuthToken({ token: verify.token, address: account });
      } else {
        setAllowed(false);
        setAuthToken({ token: "", address: "" });
      }
      setLoading(false);
    } catch (error) {
      console.log("something went wrong", error);
      setLoading(false);
      setAuthToken({ token: "", address: "" });
    }
  };

  return (
    <Button disabled={loading || !allowed} onClick={signIn}>
      {allowed ? "Sign-In" : "Not Eligible"}
    </Button>
  );
}
