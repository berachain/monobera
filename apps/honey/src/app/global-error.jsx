"use client";

import { useEffect } from "react";
import NextError from "next/error";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({ error }) {
  // useEffect(() => {
  //   Sentry.captureException(error);
  // }, [error]);

  return (
    <html lang={"en-US"}>
      <body>
        <NextError />
      </body>
    </html>
  );
}
