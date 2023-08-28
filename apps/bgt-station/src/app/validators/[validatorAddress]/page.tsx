import { type Metadata } from "next";

import { indexerUrl } from "~/config";
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
  try {
    // const res = await fetch(`${indexerUrl}/bgt/rewards/delegator/${address}`);
    const res = await fetch(
      `${indexerUrl}/cuttingboards/active?validators=${address}`,
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
  params: { validatorAddress: `0x${string}` };
}) {
  const { validatorAddress } = params;

  const [cuttingBoard] = await Promise.all([getCuttingBoard(validatorAddress)]);

  return <Validator {...{ validatorAddress, cuttingBoard }} />;
}
