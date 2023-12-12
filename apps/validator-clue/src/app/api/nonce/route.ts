// import { validatorClueEndpoint } from "@bera/config";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const nonce = await fetch(`${validatorClueEndpoint}/api/v1/auth/nonce`);
//     const res = await nonce.json();
//     return NextResponse.json(res);
//   } catch (e) {
//     console.log(`Error fetching nonce: ${e}`);
//     return NextResponse.json({ error: e });
//   }
// }

// export default GET;

import { NextResponse } from "next/server";
import { validatorClueEndpoint } from "@bera/config";
import { getSession } from "next-auth/react";

import { Header } from "~/utils/ironOption";

export async function GET() {
  try {
    // Retrieve the session
    // const session = await getSession({ req });
    // if (!session) {
    //   // Handle the case where there is no session
    //   return new NextResponse(JSON.stringify({ error: "No session found" }), {
    //     status: 401,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    // }

    // Fetch the nonce
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
    return new NextResponse(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: Header,
    });
  }
}

export default GET;
