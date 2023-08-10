import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

const endpoint = process.env.NEXT_PUBLIC_INDEXER_ENDPOINT;
async function getSwaps(address: string) {
  try {
    const res: any = await fetch(
      `${endpoint}/events/dex/swap?pool=${address}`,
      { cache: "no-store" },
    );
    const jsonRes = await res.json();
    if (!jsonRes) {
      throw new Error("Failed to fetch swap data");
    }
    return jsonRes;
  } catch (e) {
    notFound();
  }
}

async function getAddLiquidity(address: string) {
  try {
    const res: any = await fetch(
      `${endpoint}/events/dex/add_liquidity?pool=${address}`,
      { cache: "no-store" },
    );
    const jsonRes = await res.json();
    if (!jsonRes) {
      throw new Error("Failed to fetch add liquidity data");
    }
    return jsonRes;
  } catch (e) {
    notFound();
  }
}

async function getRemoveLiquidity(address: string) {
  try {
    const res: any = await fetch(
      `${endpoint}/events/dex/remove_liquidity?pool=${address}`,
      { cache: "no-store" },
    );
    const jsonRes = await res.json();
    if (!jsonRes) {
      throw new Error("Failed to fetch remove liquidity data");
    }
    return jsonRes;
  } catch (e) {
    notFound();
  }
}

function sortByBlockTime(data: any[]): any[] {
  return data
    .sort(
      (a, b) => parseInt(a.metadata.blockTime) - parseInt(b.metadata.blockTime),
    )
    .reverse();
}

const DEFAULT_SIZE = 10;

export const revalidate = 1000;

export async function GET(
  request: Request,
  { params }: { params: { address: string } },
) {
  const { searchParams } = new URL(request.url);

  // pages
  const page = searchParams.get("page");
  const perPage = searchParams.get("perPage");

  const swap = searchParams.get("swap");
  const provisions = searchParams.get("provisions");

  const swaps = getSwaps(params.address);
  const adds = getAddLiquidity(params.address);
  const removes = getRemoveLiquidity(params.address);

  const data: any = await Promise.all([swaps, adds, removes])
    .then(([swaps, adds, removes]) => ({
      swaps: swaps.result,
      adds: adds.result,
      removes: removes.result,
    }))
    .catch(() => undefined);

  if (!data) return NextResponse.json({});

  let sortedData = [];
  if (swap === null && provisions === null) {
    sortedData = sortByBlockTime([
      ...data.swaps,
      ...data.adds,
      ...data.removes,
    ]);
  }
  if (swap !== null && provisions === null) {
    sortedData = sortByBlockTime([...data.swaps]);
  }
  if (swap === null && provisions !== null) {
    sortedData = sortByBlockTime([...data.adds, ...data.removes]);
  }

  if (!sortedData) return NextResponse.json({});

  let paginatedData = sortedData;
  if (page && !perPage) {
    paginatedData = paginatedData.slice(
      (parseInt(page) - 1) * DEFAULT_SIZE,
      parseInt(page) * DEFAULT_SIZE,
    );
  }
  if (!page && perPage) {
    paginatedData = paginatedData.slice(0, parseInt(perPage));
  }
  if (page && perPage) {
    paginatedData = paginatedData.slice(
      (parseInt(page) - 1) * parseInt(perPage),
      parseInt(page) * parseInt(perPage),
    );
  }

  return NextResponse.json(paginatedData);
}
