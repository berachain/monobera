import { NextResponse } from "next/server";

export async function GET() {
  try {
    // const { body } = await request.json();
    // const res = await fetch(
    //   `${faucetEndpointUrl}/api/claim?address=${body.address}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${tweetId.token}`,
    //     },
    //     body: JSON.stringify({ tweetId: body.tweetId }),
    //   },
    // );
    
    return NextResponse.json({gid: Math.random()});
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message});
  }
}
