import { type Metadata } from "next";
import { type CuttingBoard } from "@bera/berajs";
import { getAddress } from "viem";

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
const getPoolTvl = async (address: string) => {
  try {
    // const res = await fetch(`${indexerUrl}/bgt/rewards/delegator/${address}`);

    // TODO: narrow window to past day reee
    const now = Math.floor(Date.now() / 1000);
    const yesterday = now - 12000000;
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_ANALYTICS
      }/analytics/tvldaily?from_time=${yesterday}&to_time=${now}&pool=${getAddress(
        address,
      )}`,
    );
    const jsonRes = await res.json();
    return jsonRes.result[jsonRes.result.length - 1] ?? undefined;
  } catch (e) {
    console.log(e);
  }
};
export default async function Page({
  params,
}: {
  params: { validatorAddress: `0x${string}` };
}) {
  const { validatorAddress } = params;

  const [cuttingBoard] = await Promise.all([getCuttingBoard(validatorAddress)]);

  const cb: CuttingBoard[] = cuttingBoard[0].weights;
  const promiseArray = cb.map((w: CuttingBoard) => getPoolTvl(w.address));

  const cbTvlData = await Promise.all(promiseArray);

  return <Validator {...{ validatorAddress, cuttingBoard, cbTvlData }} />;
}
