// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isProduction = process.env.NODE_ENV === 'production';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  tracesSampleRate: isProduction ? 0.2 : 1.0,  // 100% в разработке, 20% в продакшне
  debug: !isProduction,  // Включаем отладку только в разработке

  replaysOnErrorSampleRate: isProduction ? 0.5 : 1.0,  // В продакшне меньше сессий
  replaysSessionSampleRate: isProduction ? 0.1 : 1.0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
