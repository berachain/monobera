import { type Metadata } from "next";

import { HoneyMachine } from "~/components/honey-machine";

export const metadata: Metadata = {
  title: "Honey | Berachain",
  description: "Mo honey mo problems",
};

export default function Home() {
  return (
    <div className="bg-[#468DCB]">
      <div className="m-auto hidden max-w-[1000px] honey:block">
        <HoneyMachine />
      </div>
    </div>
  );
}
