import { type Metadata } from "next";
import { type Address } from "viem";

import Validator from "./validator";
import { RouterService, defaultConfig } from "@bera/bera-router";
import { MappedTokens, getBaseTokenPrice } from "~/app/api/getPrice";

type Props = {
  params: { validatorAddress: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { validatorAddress } = params;
  return {
    title: `${validatorAddress} Validator | DEX | Berachain`,
  };
}

async function getCuttingBoard(address: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_INDEXER_ENDPOINT}/cuttingboards/active?validators=${address}`,
    );
    const jsonRes = await res.json();
    return jsonRes.result;
  } catch (e) {
    console.log(e);
  }
}

async function getPools(address: string[]) {
  const router = new RouterService(defaultConfig);
  try {
    await router.fetchPools();
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    return;
  }
  const pools = router.getPools() ?? [];

  const mappedTokens: MappedTokens | undefined = await getBaseTokenPrice(
    pools,
    router,
  );

  
}

export default async function Page({
  params,
}: {
  params: { validatorAddress: string };
}) {

  const { validatorAddress } = params;
  const cuttingBoard = getCuttingBoard(params?.validatorAddress);
  const data: any = await Promise.all([cuttingBoard]).then(
    ([cuttingBoard]) => ({
      cuttingBoard: cuttingBoard,
    }),
  );
  return (
    <Validator
      validatorAddress={validatorAddress as Address}
      cuttingBoard={data.cuttingBoard[0].weights ?? undefined}
    />
  );
}
