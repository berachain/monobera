import * as React from "react";
import { useBeraJs, useChainId } from "@bera/berajs";
import { validatorClueEndpoint } from "@bera/config";
import { Button } from "@bera/ui/button";
import { SiweMessage } from "siwe";
import { useSignMessage } from "wagmi";

export function SignInButton({
  onSuccess,
  onError,
}: {
  onSuccess: (args: { address: string }) => void;
  onError: (args: { error: Error }) => void;
}) {
  const [state, setState] = React.useState<{
    loading?: boolean;
    nonce?: string;
  }>({});
  const { account } = useBeraJs();
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();

  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch(`/api/nonce`);
      const nonce = await nonceRes.json();
      setState((x) => ({ ...x, nonce }));
    } catch (error) {
      setState((x) => ({ ...x, error: error as Error }));
    }
  };

  React.useEffect(() => {
    void fetchNonce();
  }, []);

  const signIn = async () => {
    try {
      if (!account || !chainId) return;

      setState((x) => ({ ...x, loading: true }));

      const message = new SiweMessage({
        domain: window.location.host,
        address: account,
        statement: "Validator clue sign in.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: state.nonce,
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
      if (verifyRes.status === 200) {
        const verify = await verifyRes.json();
        console.log("verify:3", verify.token);
      }
      setState((x) => ({ ...x, loading: false }));
      onSuccess({ address: account });
    } catch (error) {
      console.log("error:3", error);
      // setState((x) => ({ ...x, loading: false, nonce: undefined }));
      // onError({ error: error as Error });
      // void fetchNonce();
    }
  };

  return (
    <Button disabled={!state.nonce || state.loading} onClick={signIn}>
      Sign-In with SIWE
    </Button>
  );
}
