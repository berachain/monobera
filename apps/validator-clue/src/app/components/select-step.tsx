import { Button } from "@bera/ui/button";

export default function SelectStep({
  validator,
  // setValidator,
  pool,
}: // setPool,
{
  validator: any;
  setValidator: (validator: any) => void;
  pool: any;
  setPool: (validator: any) => void;
}) {
  return (
    <div className=" flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="text-xs leading-5">Select Validator</div>
          <div className="text-xs leading-5">0x446...7869</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xs leading-5">Select Pool</div>
          <div className="text-xs leading-5">0x446...7869</div>
        </div>
      </div>
      <Button className="w-full" disabled={!validator && !pool}>
        Vote
      </Button>
    </div>
  );
}
