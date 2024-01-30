import { type Metadata } from "next";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { cn } from "@bera/ui";

import { getMetaTitle } from "~/utils/metadata";
import Data from "~/components/data";
import { HoneyChart } from "~/components/honey-chart";
import HoneyPage from "~/components/honey-page";
import HoneyTransactionsTable from "~/components/honey-transactions-table";
import ModeSwitch from "~/components/mode-switch";

export const metadata: Metadata = {
  title: getMetaTitle("Honey"),
  description: "Mint & Redeem Honey",
};

export const revalidate = 10;

export default function Home({
  searchParams: { mode },
}: {
  searchParams: {
    mode: "arcade" | "pro";
  };
}) {
  const arcade = mode === "arcade";
  return (
    <div
      className={cn(arcade ? "bg-[#468DCB] font-honey" : "pro-mode-background")}
    >
      <ModeSwitch arcade={arcade} />
      <div className="container max-w-[1050px]">
        <HoneyPage arcade={arcade} />
        <div
          className={cn(
            arcade
              ? "bg-gradient-to-b from-[#468DCB] text-blue-900 honey:to-background"
              : "",
          )}
        >
          <Data arcade={arcade} />

          <div className="py-4">
            {arcade ? (
              <h3 className="mb-4 flex items-center gap-3 text-lg text-blue-900 md:text-3xl">
                <Image
                  src={`${cloudinaryUrl}/honey/qqyo5g3phzdwezvazsih`}
                  className="w-8"
                  alt="honey"
                  width={32}
                  height={32}
                />
                Total Honey Supply & Volume
              </h3>
            ) : (
              <h3 className="mb-12 flex items-center justify-center gap-2 text-3xl font-bold md:text-5xl">
                <Image
                  src={`${cloudinaryUrl}/honey/gugztuverdsqvzw5co8a`}
                  className="w-12"
                  alt="honey"
                  width={48}
                  height={48}
                />
                Honey Stats
              </h3>
            )}
            <HoneyChart arcade={arcade} />
          </div>
          <HoneyTransactionsTable arcade={arcade} />
        </div>
      </div>
    </div>
  );
}
