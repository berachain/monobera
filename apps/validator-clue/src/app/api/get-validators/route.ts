import { NextResponse } from "next/server";
import { validatorClueEndpoint } from "@bera/config";

import { Header } from "~/utils/ironOption";

export async function GET() {
  try {
    // Fetch the nonce
    const valsRes = await fetch(
      `${validatorClueEndpoint}/api/v1/leaderboard/validators`,
    );
    if (!valsRes.ok)
      throw new Error(`API responded with status ${valsRes.status}`);
    const res = await valsRes.json();

    // Return the response
    return new NextResponse(JSON.stringify(res), {
      status: 200,
      headers: Header,
    });
  } catch (e) {
    console.error(`Error fetching nonce: ${e}`);
    //@ts-ignore
    return new NextResponse(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: Header,
    });
  }
}

export default GET;
