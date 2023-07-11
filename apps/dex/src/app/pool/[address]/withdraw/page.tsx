import { type Metadata } from "next";

import WithdrawPageContent from "./WithdrawPageContent";

type Props = {
  params: { address: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { address } = params;
  return {
    title: `Withdraw from ${address} Pool | DEX | Berachain`,
  };
}

export default function Withdraw({ params }: { params: { address: string } }) {
  return <WithdrawPageContent params={params} />;
}
