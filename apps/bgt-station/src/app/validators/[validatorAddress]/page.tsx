import { type Metadata } from "next";
import { type CuttingBoard } from "@bera/berajs";
import { indexerUrl } from "@bera/config";
import { getAddress } from "viem";

import { getMetaTitle } from "~/utils/metadata";
import Validator from "./validator";
import { getAbsoluteUrl } from "~/utils/vercel-utils";

type Props = {
  params: { validatorAddress: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { validatorAddress } = params;
  return {
    title: getMetaTitle("Validator Details"),
    description: `Validator details for ${validatorAddress}`,
    openGraph: {
      images: '/opengraph-image.png'
    },
    metadataBase: new URL(getAbsoluteUrl())
  };
}

// async function getVotes(address: string) {
//   try {
//     // const res = await fetch(`${indexerUrl}/bgt/rewards/delegator/${address}`);
//     const res = await fetch(
//       `${indexerUrl}/events/gov/votes?voter=${proposalId}`,
//     );
//     const jsonRes = await res.json();
//     return jsonRes.result;
//   } catch (e) {
//     console.log(e);
//   }
// }

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

async function getHistoricalBribeEpochs(
  address: string,
  num_of_epochs: number,
) {
  try {
    // const res = await fetch(`${indexerUrl}/bgt/rewards/delegator/${address}`);
    const res = await fetch(
      `${indexerUrl}/historicalbribes?validators=${address}&num_of_epochs=${num_of_epochs}`,
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

  const [cuttingBoard, allEpochs] = await Promise.all([
    getCuttingBoard(validatorAddress),
    getHistoricalBribeEpochs(validatorAddress, 10000),
  ]);

  const cb: CuttingBoard[] =
    cuttingBoard?.length !== 0 && cuttingBoard !== undefined
      ? cuttingBoard[0].weights
      : undefined;
  const promiseArray = cb?.map((w: CuttingBoard) => getPoolTvl(w.address));

  const cbTvlData =
    promiseArray !== undefined && promiseArray.length !== 0
      ? await Promise.all(promiseArray)
      : undefined;

  return (
    <Validator
      {...{ validatorAddress, cuttingBoard, cbTvlData }}
      allEpochs={allEpochs}
    />
  );
}
