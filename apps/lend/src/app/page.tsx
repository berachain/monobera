import React from "react";

import { Header } from "~/components/header";
import HoneyBanner from "~/components/honey-banner";
import RewardBanner from "~/components/reward-banner";

export default function Home() {
  return (
    <>
      <Header />
      <br />
      <div className="container pt-14">
        Earn Interest And Rewards By Supplying Your Assets And Borrowing Honey
        <HoneyBanner />
        <br />
        <RewardBanner />
      </div>
    </>
  );
}
