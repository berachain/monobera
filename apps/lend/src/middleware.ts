import { NextResponse, type NextRequest } from "next/server";

const BLOCKED_COUNTRY = ["CU", "IR", "KP", "SY", "SD"];
export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/"],
};
export function middleware(req: NextRequest) {
  // Extract country
  const country = req.geo?.country || "CU";

  // Specify the correct pathname
  if (BLOCKED_COUNTRY.includes(country)) {
    req.nextUrl.pathname = `/access-deny`;
  } else {
    req.nextUrl.pathname = `/`;
  }

  // Rewrite to URL
  return NextResponse.rewrite(req.nextUrl);
}
