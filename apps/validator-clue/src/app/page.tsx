import { type Metadata } from "next";
import { validatorClueEndpoint } from "@bera/config";

import Content from "../components/content";
import GlobalConsole from "../components/global-console";
import { tabEnum, type tabEnum as tabEnumT } from "./types";

export const metadata: Metadata = {
  title: `Berachain Validator Clue`,
  description: `Fund your testnet wallet with bera tokens.`,
};

export const revalidate = 6;

async function getValidators() {
  try {
    const poolsRes = await fetch(
      `${validatorClueEndpoint}/api/v1/leaderboard/validators`,
    );
    const res = await poolsRes.json();
    return res ? res : [];
  } catch (e) {
    console.error(`Error fetching validators: ${e}`);
    return [];
  }
}

async function getPools() {
  try {
    const poolsRes = await fetch(
      `${validatorClueEndpoint}/api/v1/leaderboard/pools`,
    );
    const res = await poolsRes.json();
    return res ? res : [];
  } catch (e) {
    console.error(`Error fetching pools: ${e}`);
    return [];
  }
}

async function getObituaries() {
  try {
    const poolsRes = await fetch(
      `${validatorClueEndpoint}/api/v1/leaderboard/obituaries`,
    );
    const res = await poolsRes.json();
    return res ? res : [];
  } catch (e) {
    console.error(`Error fetching obituaries: ${e}`);
    return [];
  }
}

async function getNotifications() {
  try {
    const poolsRes = await fetch(
      `${validatorClueEndpoint}/api/v1/notifications`,
    );
    const res = await poolsRes.json();
    return res ? res : [];
  } catch (e) {
    console.error(`Error fetching notifications: ${e}`);
    return [];
  }
}
async function getEpoch() {
  try {
    const poolsRes = await fetch(`${validatorClueEndpoint}/api/v1/epoch`);
    const res = await poolsRes.json();
    return res;
  } catch (e) {
    console.error(`Error fetching epoch: ${e}`);
    return {};
  }
}
export default async function Page({
  searchParams,
}: {
  searchParams: {
    tab: tabEnumT;
  };
}) {
  const [validators, pools, obituaries, notifications, epoch] =
    await Promise.all([
      getValidators(),
      getPools(),
      getObituaries(),
      getNotifications(),
      getEpoch(),
    ]);

  return (
    <div className="container mx-auto mt-8 flex w-full flex-col gap-4 xl:flex-row xl:gap-8">
      <Content
        tab={searchParams.tab ?? tabEnum.GAME}
        {...{ validators, pools, obituaries, epoch }}
      />
      <GlobalConsole notifications={notifications} />
    </div>
  );
}
