import { NextResponse } from "next/server";

export function middleware(request: Request) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  const url = new URL(request.url);
  const pathname = url.pathname;
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}
