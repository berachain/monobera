import { type Metadata } from "next";

import PoolPageHeader from "./PoolPageHeader";

export const metadata: Metadata = {
  title: "Pools",
  description: "View pools",
};

export default function Pool() {
  return (
    <div className="flex w-full flex-col gap-5">
      <PoolPageHeader />
    </div>
  );
}
