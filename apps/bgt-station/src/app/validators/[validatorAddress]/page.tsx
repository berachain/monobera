import { type Metadata } from "next";
import { type Address } from "viem";

import Validator from "./validator";

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
  console.log("address", address);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_INDEXER_ENDPOINT}/bgt/rewards`,
    );
    const jsonRes = await res.json();
    return jsonRes.result;
  } catch (e) {
    console.log(e);
  }
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
      cuttingBoard={data.cuttingBoard}
    />
  );
}
