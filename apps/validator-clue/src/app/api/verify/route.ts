import { NextResponse, type NextRequest } from "next/server";
import { validatorClueEndpoint } from "@bera/config";

import { Header } from "~/utils/ironOption";

export async function POST(req: NextRequest) {
  try {
    console.log("req.body", req.body);
    const verifyRes = await fetch(
      `${validatorClueEndpoint}/api/v1/auth/verify`,
      {
        method: "POST",
        headers: Header,
        body: req.body,
      },
    );
    if (!verifyRes.ok) {
      throw new Error(`API responded with status ${verifyRes.status}`);
    }
    const result = await verifyRes.json();
    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: Header,
    });
  } catch (e) {
    console.error(`Error in /api/verify: ${e}`);
    //@ts-ignore
    return new NextResponse(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: Header,
    });
  }
}

export default POST;
