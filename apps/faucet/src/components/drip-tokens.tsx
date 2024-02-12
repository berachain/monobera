import React, { useEffect, useRef } from "react";
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
  const [token, setToken] = React.useState<string | null>(null);
  const turnstile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let inputElement: HTMLInputElement | null = null;
    let observer: MutationObserver | null = null;

    const checkAndObserveInputElement = () => {
      // Attempt to find the input element
      const foundElement = document.querySelector(
        'input[name="cf-turnstile-response"]',
      ) as HTMLInputElement;
      if (foundElement && foundElement !== inputElement) {
        inputElement = foundElement;

        // Set up a MutationObserver to observe changes to the value attribute
        observer?.disconnect(); // Disconnect any existing observer
        observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "value"
            ) {
              setToken(inputElement!.value);
            }
          }
        });

        observer.observe(inputElement, {
          attributes: true,
          attributeFilter: ["value"],
        });
      }
    };

    // Periodically check for the input element's existence
    const intervalId = setInterval(checkAndObserveInputElement, 1000);

    // Cleanup function to clear the interval and disconnect the observer
    return () => {
      clearInterval(intervalId);
      observer?.disconnect();
    };
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
      {!token ? (
        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_KEY!}
          data-theme="light"
          ref={turnstile}
          data-appearance="execute"
        />
      ) : (
        <Button
          disabled={!isAddress(address ?? "")}
          className="mb-4 w-full"
          type="submit"
        >
          Drip Tokens
        </Button>
      )}
    </form>
  );
}
