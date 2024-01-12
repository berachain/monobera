import React from "react";
import { Button } from "@bera/ui/button";

const ReCAPTCHAButton = ({
  setToken,
  setBot,
}: {
  setToken: (token: string) => void;
  bot: boolean | undefined;
  setBot: (bot: boolean) => void;
}) => {
  const onClick = (e: any) => {
    e.preventDefault();
    //@ts-ignore
    if (typeof window.grecaptcha !== "undefined") {
      //@ts-ignore
      window.grecaptcha.ready(() => {
        //@ts-ignore
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
            action: "submit",
          })
          .then((token: any) => {
            if (token) {
              setToken(token);
              setBot(false);
            } else {
              setBot(true);
            }
          });
      });
    }
  };

  return (
    <Button onClick={onClick} className="w-full">
      Click here to prove you are not a bot
    </Button>
  );
};

export default ReCAPTCHAButton;
