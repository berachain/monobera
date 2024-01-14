import { NextResponse } from "next/server";
import { beraTokenAddress, nativeTokenAddress, subgraphUrl } from "@bera/config";
import { getAddress } from "ethers";
import lodash from "lodash";
import { type Address } from "wagmi";

export const revalidate = 10;

export async function GET() {
  try {
    const td = await fetch(subgraphUrl, {
      method: "POST",
      body: JSON.stringify({
        query: `{
            tokenHoneyPrices{
              id
              price
            }
          }`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    })
      .then(async (res) => await res.json())
      .catch((e: any) => {
        console.log("fetching error", e);
        return undefined;
      });

    const tokenHoneyPrices = td.data.tokenHoneyPrices;

    const tokenHoneyPricesObj: Record<Address, string> = {};
    tokenHoneyPrices.forEach((thp: { id: string; price: string }) => {
      if(getAddress(thp.id) === beraTokenAddress) {
        lodash.set(tokenHoneyPricesObj, nativeTokenAddress, thp.price);
      }
      lodash.set(tokenHoneyPricesObj, getAddress(thp.id), thp.price);
    });
    return NextResponse.json(tokenHoneyPricesObj);
  } catch (e) {
    return NextResponse.json({});
  }
}
