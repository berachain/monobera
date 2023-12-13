import Link from "next/link";
import { honeyUrl } from "@bera/config";
import { Button } from "@bera/ui/button";

export default function Boxes() {
  return (
    <div className="hidden w-full gap-4 xl:flex">
      <div className="flex flex-1 gap-4 rounded-sm bg-muted p-4">
        <div className="h-[144px] w-[183px] bg-red-500">place holder</div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="text-xl font-bold leading-7">Voting Has Begun</div>
            <div className="mt-1 text-xs leading-5 text-yellow-500">
              Cast your vote before the epoch ends
            </div>
          </div>
          <Link href="/?tab=votes">
            <Button size={"sm"} className="w-fit">
              Vote
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-1 gap-4 rounded-sm bg-sky-200 p-4">
        <div className="h-[144px] w-[183px] bg-blue-500">place holder</div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="text-xl font-bold leading-7 text-sky-800">
              Mint HONEY
            </div>
            <div className="mt-1 text-xs leading-5 text-sky-600">
              Swap your fav stables into honey.
            </div>
          </div>
          <Link href={honeyUrl} target="_blank">
            <Button size={"sm"} className="w-fit" variant={"info"}>
              Mint Honey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
