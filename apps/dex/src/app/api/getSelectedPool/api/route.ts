// TODO fix any

import { NextResponse } from "next/server";
import { type Pool } from "@bera/bera-router";

import { getAbsoluteUrl } from "~/utils/vercel-utils";

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const address = searchParams.get("address");

  const response = await fetch(`${getAbsoluteUrl()}/api/getPools/api`);

  const pools = await response.json();

  const pool = pools.find(
    (p: Pool) => p.pool.toLowerCase() === address?.toLowerCase(),
  );
  // pages

  return NextResponse.json(pool);
}
