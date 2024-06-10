import { NextResponse } from "next/server";
import { validatorClueEndpoint } from "@bera/config";

import { Header } from "~/utils/ironOption";

export const revalidate = 1000;

export async function GET() {
  try {
    const nonceResponse = await fetch(
      `${validatorClueEndpoint}/api/v1/auth/nonce`,
    );
    if (!nonceResponse.ok)
      throw new Error(`API responded with status ${nonceResponse.status}`);
    const res = await nonceResponse.json();

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
