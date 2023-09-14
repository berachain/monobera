import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { indexerUrl } from "@bera/config";

async function getMints(page: number, perPage: number) {
  try {
    // console.log(
    //   "getMints",
    //   `${indexerUrl}/events/pol/honey_minted?num_of_days=1000000&page=${page}&per_page=${perPage}`,
    // );
    const res: any = await fetch(
      `${indexerUrl}/events/pol/honey_minted?num_of_days=1000000&page=${page}&per_page=${perPage}`,
      { cache: "no-store" },
    );
    const jsonRes = await res.json();
    if (!jsonRes) {
      throw new Error("Failed to fetch honey mint data");
    }
    return jsonRes;
  } catch (e) {
    notFound();
  }
}

async function getBurns(page: number, perPage: number) {
  try {
    const res: any = await fetch(
      `${indexerUrl}/events/pol/honey_redeemed?num_of_days=1000000&page=${page}&per_page=${perPage}`,
      { cache: "no-store" },
    );
    const jsonRes = await res.json();

    if (!jsonRes) {
      throw new Error("Failed to fetch add liquidity data");
    }
    // console.log(
    //   "getBurns",
    //   jsonRes,
    //   `${indexerUrl}/events/pol/honey_minted?num_of_days=1000000&page=${page}&per_page=${perPage}`,
    // );
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

// const DEFAULT_SIZE = 5;

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page");
  const perPage = searchParams.get("perPage");

  const mint = searchParams.get("mint");
  const burn = searchParams.get("burn");

  const mints = getMints(Number(page || 1), Number(perPage));
  const burns = getBurns(Number(page || 1), Number(perPage));

  const data: any = await Promise.all([mints, burns])
    .then(([mints, burns]) => ({
      mints: mints.result ?? [],
      burns: burns.result ?? [],
    }))
    .catch(() => undefined);

  if (!data) return NextResponse.json({});

  let sortedData = [];
  if (mint === null && burn === null) {
    sortedData = sortByBlockTime([...data.mints, ...data.burns]);
  } else if (mint !== null && burn === null) {
    sortedData = sortByBlockTime([...data.mints]);
  } else if (mint === null && burn !== null) {
    sortedData = sortByBlockTime([...data.burns]);
  } else {
    sortedData = sortByBlockTime([...data.mints, ...data.burns]);
  }

  if (!sortedData) return NextResponse.json({});
  else {
    return NextResponse.json(sortedData);
  }
}
