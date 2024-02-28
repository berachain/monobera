/* eslint-disable no-restricted-imports */
import {
  captureEvent as _captureEvent,
  captureException as _captureException,
} from "@sentry/nextjs";

export const captureException: typeof _captureException = (error, hint) => {
  return _captureException(error, hint);
};

export const captureEvent: typeof _captureEvent = (event, hint) => {
  return _captureEvent(event, hint);
};
