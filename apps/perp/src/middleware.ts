import { NextResponse, type NextRequest } from "next/server";

const BLOCKED_COUNTRY = [
  "BA",
  "BU",
  "BY",
  "CD",
  "CF",
  "CU",
  "ET",
  "IR",
  "IQ",
  "KP",
  "LY",
  "SD",
  "SY",
  "RU",
  "XC",
  "MM",
  "VE",
  "YE",
  "UK",
  "ZW",
];
export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/((?!monitoring-tunnel))"],
};
export function middleware(req: NextRequest) {
  // Extract country
  const country = req.geo?.country || "CA";
  console.log("middleware.ts: country: ", country);

  // Specify the correct pathname
  if (BLOCKED_COUNTRY.includes(country)) {
    req.nextUrl.pathname = "/access-deny";
  } else {
    req.nextUrl.pathname = "/";
  }

  // Rewrite to URL
  return NextResponse.rewrite(req.nextUrl);
}
