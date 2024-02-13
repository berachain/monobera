import React, { useEffect, useRef } from "react";
import { faucetEndpointUrl } from "@bera/config";
import { cn } from "@bera/ui";
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
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
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

  async function handleRequest(token: string | null) {
    setShowAlert();
    if (!token) {
      setAlert("error");
      return;
    }
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

  return (
    <div>
      <div
        className={cn("cf-turnstile", token ? "hidden" : "block")}
        data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_KEY!}
        data-theme="light"
        ref={turnstile}
        data-appearance="execute"
      />
      <Button
        disabled={!isAddress(address ?? "") || buttonDisabled}
        className={cn("mb-4 w-full", token ? "block" : "hidden")}
        type="submit"
        onClick={() => {
          setButtonDisabled(true);
          void handleRequest(token);
        }}
      >
        Drip Tokens
      </Button>
      is Address: {isAddress(address ?? "")}<br/>
      token: {token}
    </div>
  );
}
