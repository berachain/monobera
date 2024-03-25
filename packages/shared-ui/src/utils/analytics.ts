/* eslint-disable no-restricted-imports */
import {
  developmentAnalytics,
  mixpanelProjectToken,
  projectName,
} from "@bera/config";
import {
  captureEvent as _captureEvent,
  captureException as _captureException,
} from "@sentry/react";
import mixpanel from "mixpanel-browser";

const isDevelopmentWithoutAnalytics =
  process.env.NODE_ENV === "development" && !developmentAnalytics;

const isMixpanelEnabled =
  mixpanelProjectToken && !isDevelopmentWithoutAnalytics;

if (isMixpanelEnabled) {
  mixpanel.init(mixpanelProjectToken, {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });
}

export const useAnalytics = () => {
  const captureException: typeof _captureException = (
    error: any,
    hint: any,
  ) => {
    return _captureException(error, hint);
  };

  const setAnalyticsUserId = (userId: string) => {
    if (!isMixpanelEnabled) {
      return;
    }
    mixpanel.reset();
    mixpanel.identify(userId);
  };

  const unsetAnalyticsUserId = () => {
    if (!isMixpanelEnabled) {
      return;
    }
    mixpanel.reset();
  };

  const track = (eventName: string, eventData?: { [key: string]: any }) => {
    if (!isMixpanelEnabled) {
      return;
    }
    mixpanel.track(eventName, {
      eventData,
      project: projectName ?? "unknown",
      env: process.env.NODE_ENV,
    });
  };

  return { track, setAnalyticsUserId, unsetAnalyticsUserId, captureException };
};
