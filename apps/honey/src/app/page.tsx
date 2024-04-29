import { type Metadata } from "next";
import Image from "next/image";
import { cloudinaryUrl, honeyName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import { cn } from "@bera/ui";

import Data from "~/components/data";
import { HoneyChart } from "~/components/honey-chart";
import HoneyPage from "~/components/honey-page";
import HoneyTransactionsTable from "~/components/honey-transactions-table";
import ModeSwitch from "~/components/mode-switch";

export const metadata: Metadata = {
  title: getMetaTitle("Honey", honeyName),
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
      className={cn(
        "dark:font-honey dark:bg-backgroundSecondary bg-[url('./background.svg')] bg-cover bg-top dark:bg-none",
      )}
    >
      <ModeSwitch arcade={arcade} />
      <HoneyPage />
      <div
        className={
          "dark:bg-gradient-to-b dark:from-backgroundSecondary dark:text-foregroundSecondary dark:to-background"
        }
      >
        <div className="container max-w-[1200px]">
          <Data />
          <div className="py-4">
            <h3 className="mb-4 hidden items-center gap-3 text-lg dark:flex md:text-3xl">
              <Image
                src={`${cloudinaryUrl}/honey/qqyo5g3phzdwezvazsih`}
                className="w-8"
                alt="honey"
                width={32}
                height={32}
              />
              Total Honey Supply & Volume
            </h3>
            <h3 className="mb-12 flex items-center justify-center gap-2 text-3xl font-bold dark:hidden md:text-5xl">
              <Image
                src={`${cloudinaryUrl}/honey/gugztuverdsqvzw5co8a`}
                className="w-12"
                alt="honey"
                width={48}
                height={48}
              />
              Honey Stats
            </h3>

            <HoneyChart arcade={arcade} />
          </div>
          <HoneyTransactionsTable arcade={arcade} />
        </div>
      </div>
    </div>
  );
}
