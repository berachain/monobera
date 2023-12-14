import { useState } from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Button } from "@bera/ui/button";

import { IMGMap } from "~/utils/image-map";
import SelectStep from "./select-step";

export default function VoteCard() {
  const [step, setStep] = useState(0);
  const [validator, setValidator] = useState(undefined);
  const [pool, setPool] = useState(undefined);
  return (
    <div className="flex h-full w-[320px] items-center justify-center border border-border bg-[#FFFDD3] p-5 rounded-sm">
      {step === 0 && (
        <div>
          <Image
            src={`${cloudinaryUrl}/clue/${IMGMap["vote-card-default"]}`}
            alt="vote-card-default"
            width={222}
            height={273}
          />
          <Button className="mt-1 w-full" onClick={() => setStep(1)}>
            Vote
          </Button>
        </div>
      )}
      {step === 1 && (
        <SelectStep
          validator={validator}
          setValidator={setValidator}
          pool={pool}
          setPool={setPool}
        />
      )}
      {step === 2 && <div>hi</div>}
    </div>
  );
}
