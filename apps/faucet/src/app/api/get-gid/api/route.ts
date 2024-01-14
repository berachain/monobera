import { NextResponse } from "next/server";
import { faucetEndpointUrl } from "@bera/config";

export async function GET() {
  try {
    const res = await fetch(`${faucetEndpointUrl}/api/code`, {
      method: "GET",
      cache: "no-store",
    });
    const { code } = await res.json();
    return NextResponse.json({ bid: code });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
