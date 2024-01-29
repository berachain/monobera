import { cn } from "@bera/ui";

export interface IStep {
  name: string;
  description: string;
}

type Props = {
  step: number;
  steps: IStep[];
  setStep: (step: number) => void;
};
export function CreatePoolStepper({ step = 0, steps, setStep }: Props) {
  return (
    <ol className="flex w-48 items-center justify-center	self-center">
      {steps.map((s, stepIdx) => (
        <li
          key={stepIdx}
          className={cn(
            stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
            "relative",
          )}
        >
          {stepIdx > step ? (
            <>
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="h-0.5 w-full bg-border" />
              </div>
              <div
                onClick={() => stepIdx < step && setStep(stepIdx)}
                className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-muted-foreground bg-background text-muted-foreground transition-colors duration-200"
              >
                {/* <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" /> */}
                <span className="items-center">{stepIdx + 1}</span>
              </div>
            </>
          ) : stepIdx === step ? (
            <>
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="h-0.5 w-full bg-border" />
              </div>
              <div
                onClick={() => stepIdx < step && setStep(stepIdx)}
                className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-primary bg-foreground text-background transition-colors duration-200"
                aria-current="step"
              >
                <span className="items-center rounded-full" aria-hidden="true">
                  {stepIdx + 1}
                </span>
              </div>
            </>
          ) : (
            <>
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="h-0.5 w-full bg-primary" />
              </div>
              <div
                className="group relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground transition-colors duration-200"
                onClick={() => stepIdx < step && setStep(stepIdx)}
              >
                <span
                  className="self-center rounded-full bg-transparent"
                  aria-hidden="true"
                >
                  {stepIdx + 1}
                </span>
              </div>
            </>
          )}
        </li>
      ))}
    </ol>
  );
}
