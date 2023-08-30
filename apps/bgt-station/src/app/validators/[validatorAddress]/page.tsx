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
  console.log("address", address);
  try {
    // const res = await fetch(`${indexerUrl}/bgt/rewards/delegator/${address}`);

    // TODO: narrow window to past day reee
    const res = await fetch(
      `${indexerUrl}/analytics/tvldaily?from_time=1&to_time=1699260000&pool=${getAddress(
        address,
      )}`,
    );
    const jsonRes = await res.json();
    console.log("jsonRes", jsonRes);
    return jsonRes.result;
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

  const cbTvlData = (await Promise.all(promiseArray)).filter(
    (p) => p !== undefined,
  );

  console.log("cbTvlData", cbTvlData);
  return <Validator {...{ validatorAddress, cuttingBoard, cbTvlData }} />;
}
