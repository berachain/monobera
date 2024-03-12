// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://edaa3659bfbaa09ea2ac20c77a820a18@o4506820488003584.ingest.sentry.io/4506820695949312",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  enabled: !process.env.NEXT_PUBLIC_DISABLE_ANALYTICS,
});
