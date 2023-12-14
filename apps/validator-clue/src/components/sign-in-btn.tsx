import * as React from "react";
import { useBeraJs, useChainId } from "@bera/berajs";
import { validatorClueEndpoint } from "@bera/config";
import { Button } from "@bera/ui/button";
import { SiweMessage } from "siwe";
import { useLocalStorage } from "usehooks-ts";
import { useSignMessage } from "wagmi";

export function SignInButton() {
  const { account } = useBeraJs();
  const chainId:number = useChainId()??0;
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
        setAuthToken({ token: verify.token, address: account??"" });
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
    <Button
      disabled={loading || !allowed}
      onClick={signIn}
      className="flex items-center gap-1"
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.5 20.2754V20.7754C20.5 21.3058 20.2893 21.8145 19.9142 22.1896C19.5391 22.5647 19.0304 22.7754 18.5 22.7754H6.5C5.96957 22.7754 5.46086 22.5647 5.08579 22.1896C4.71071 21.8145 4.5 21.3058 4.5 20.7754V4.77539C4.5 4.24496 4.71071 3.73625 5.08579 3.36118C5.46086 2.9861 5.96957 2.77539 6.5 2.77539H15L18.5 6.27539"
          stroke="#FEFCE8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.5 18.7754H9.5"
          stroke="#FEFCE8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.92 10.3846C19.115 10.1896 19.3465 10.0349 19.6013 9.92939C19.8561 9.82385 20.1292 9.76953 20.405 9.76953C20.6808 9.76953 20.9539 9.82385 21.2087 9.92939C21.4635 10.0349 21.695 10.1896 21.89 10.3846C22.085 10.5797 22.2397 10.8112 22.3452 11.066C22.4508 11.3208 22.5051 11.5938 22.5051 11.8696C22.5051 12.1454 22.4508 12.4185 22.3452 12.6733C22.2397 12.9281 22.085 13.1596 21.89 13.3546L17.45 17.7746L13.5 18.7746L14.49 14.8246L18.92 10.3846Z"
          stroke="#FEFCE8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      {allowed ? "Sign-In" : "Not Eligible"}
    </Button>
  );
}
