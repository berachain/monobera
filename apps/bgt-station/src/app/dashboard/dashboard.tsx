import Image from "next/image";

import { Details } from "./components/details";

export const metadata: Metadata = {
  title: "Dashboard | BGT Station | Berachain",
  description: "BGT Station",
};

export default function DashBoard() {
  return (
    <div className="container">
      <div className="flex flex-col items-center gap-1">
        <Image
          src="/bears/bee.png"
          alt="dashboard bee"
          width={164}
          height={168}
        />
        <div className="text-5xl font-bold leading-[48px] text-foreground">
          BGT Station
        </div>
        <div className="text-xl font-semibold leading-7 text-muted-foreground">
          A place for all your BGT
        </div>
      </div>
      <Details />
    </div>
  );
}
