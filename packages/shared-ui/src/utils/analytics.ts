/* eslint-disable no-restricted-imports */
import {
  captureEvent as _captureEvent,
  captureException as _captureException,
} from "@sentry/react";
import mixpanel from "mixpanel-browser";

if (process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN, {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });
}

export const useAnalytics = () => {
  const captureException: typeof _captureException = (error, hint) => {
    return _captureException(error, hint);
  };

  const setAnalyticsUserId = (userId: string) => {
    mixpanel.reset();
    mixpanel.identify(userId);
  };

  const unsetAnalyticsUserId = () => {
    mixpanel.reset();
  };

  const track = (eventName: string, eventData?: { [key: string]: any }) => {
    mixpanel.track(eventName, eventData);
  };

  return { track, setAnalyticsUserId, unsetAnalyticsUserId, captureException };
};
