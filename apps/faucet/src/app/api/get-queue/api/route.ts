import { NextResponse } from "next/server";
import { faucetEndpointUrl } from "@bera/config";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET() {
  try {
    const res = await fetch(`${faucetEndpointUrl}/api/pending_claims`, {
      method: "GET",
      cache: "no-store",
    });
    const responce = await res.json();
    return NextResponse.json(responce);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
