import { type Market } from "@bera/proto/src";
import {
  createPublicClient,
  formatUnits,
  http,
  type Address,
  type PublicClient,
} from "viem";

import { beraJsConfig } from "~/app/config";
import { BTOKEN_ABI } from "./abi/b-token";
import { PAIRS_STORAGE } from "./abi/pairs-storage";

export const getPublicClient = (): PublicClient => {
  const client = createPublicClient({
    chain: beraJsConfig.chain,
    transport: http(),
  });
  return client;
};
export async function getMarkets(): Promise<Market | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PERPS_URL}/markets`);
    const jsonRes = await res.json();
    return jsonRes.markets;
  } catch (e) {
    return undefined;
  }
}

interface GlobalParams {
  minLeverage: number;
  maxLeverage: number;
  maxCollateralP: number;
}
export async function getParams(): Promise<GlobalParams | undefined> {
  const client = getPublicClient();
  try {
    const res = (await client.readContract({
      address: process.env
        .NEXT_PUBLIC_PAIRS_STORAGE_CONTRACT_ADDRESS as Address,
      abi: PAIRS_STORAGE,
      functionName: "groups",
      args: [0],
    })) as any[];
    const globalParams: GlobalParams = {
      minLeverage: Number(res[2]),
      maxLeverage: Number(res[3]),
      maxCollateralP: Number(formatUnits(res[4], 18)),
    };
    return globalParams;
  } catch (e) {
    console.log(e);

    return undefined;
  }
}

export async function getBhoneyTotalSupply(): Promise<number | undefined> {
  const client = getPublicClient();
  try {
    const res = await client.readContract({
      address: process.env.NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address,
      abi: BTOKEN_ABI,
      functionName: "totalSupply",
      args: [],
    });
    console.log(res);
    const totalSupply = Number(formatUnits(res as bigint, 18));
    return totalSupply;
  } catch (e) {
    console.log(e);

    return undefined;
  }
}
