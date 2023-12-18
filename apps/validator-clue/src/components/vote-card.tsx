import { useState } from "react";
import Image from "next/image";
import { useBeraJs } from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import { Button } from "@bera/ui/button";

import { IMGMap } from "~/utils/image-map";
import { usePollMe } from "~/hooks/usePollMe";
import SelectStep from "./select-step";

export default function VoteCard({
  validators,
  pools,
  obituaries,
}: {
  validators: any[];
  pools: any[];
  obituaries: any[];
}) {
  const { account } = useBeraJs();
  const [step, setStep] = useState(0);
  const [validator, setValidator] = useState(undefined);
  const [pool, setPool] = useState(undefined);
  const { data: me } = usePollMe();

  const currentEpoch = 1;
  const dead = !me
    ? false
    : obituaries.find((o) => o.validator.address === account);
  const voted = !me ? false : me?.votes[0].epochNumber === currentEpoch;

  return (
    <div className="flex h-full w-[320px] items-center justify-center rounded-sm border border-border bg-[#FFFDD3] p-5">
      {step === 0 && (
        <>
          {dead ? (
            <div>
              <Image
                src={`${cloudinaryUrl}/clue/${IMGMap["voted-wrong-desktop"]}`}
                alt="voted-wrong-desktop"
                width={222}
                height={274}
                className="mx-auto"
              />
              <div className="mt-6 flex h-full w-full items-center justify-center">
                {/* <p className="mt-1 w-full" onClick={() => setStep(1)}> */}
                <p className="text-sm">You are Dead</p>
              </div>
            </div>
          ) : voted ? (
            <div className="justify-middle">
              <Image
                src={`${cloudinaryUrl}/clue/${IMGMap["voted-correct-desktop"]}`}
                alt="voted-desktop"
                width={222}
                height={274}
                className="mx-auto "
              />
              <div className="mt-6 flex h-full w-full items-center justify-center">
                <p className="text-sm">You&apos;ve already voted this epoch</p>
              </div>
            </div>
          ) : (
            <div>
              <Image
                src={`${cloudinaryUrl}/clue/${IMGMap["vote-card-default"]}`}
                alt="vote-card-default"
                width={222}
                height={274}
                className="mx-auto"
              />
              <Button
                className="mt-1 w-full"
                onClick={() => setStep(1)}
                disabled={!me}
              >
                Vote
              </Button>
            </div>
          )}
        </>
      )}
      {step === 1 && (
        <SelectStep
          validator={validator}
          setValidator={setValidator}
          pool={pool}
          setPool={setPool}
          validators={validators.filter(
            (vali: any) => vali.address !== account,
          )}
          pools={pools}
        />
      )}
      {step === 2 && <div>Vote seccuess</div>}
    </div>
  );
}
