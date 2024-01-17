// Necessary if using App Router to ensure this file runs on the client
"use client";

import { datadogRum } from "@datadog/browser-rum";

datadogRum.init({
  applicationId: "d125bc48-f091-4df2-818a-b23be1e442b0",
  clientToken: "pubc859cb1563ca3e15d7c4d1a3f6264eeb",
  site: "datadoghq.com",
  service: "monobera",
  env: "local",
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "mask-user-input",
  // Specify URLs to propagate trace headers for connection between RUM and backend trace
  allowedTracingUrls: [
    { match: "https://example.com/api/", propagatorTypes: ["tracecontext"] },
  ],
});

export function DatadogInit() {
  // Render nothing - this component is only included so that the init code
  // above will run client-side
  return null;
}
