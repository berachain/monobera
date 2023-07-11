import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";

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
    <ol role="list" className="flex justify-center gap-5 overflow-hidden">
      {steps.map((item, stepIdx) => (
        <li onClick={() => stepIdx < step && setStep(stepIdx)} key={stepIdx}>
          <a
            className={cn(
              "relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200",
              step === stepIdx && "bg-muted",
              step > stepIdx && "bg-positive/25 text-positive",
              step < stepIdx && "bg-background",
            )}
            aria-current="step"
          >
            {step > stepIdx ? <Icons.check className="h-4 w-4" /> : stepIdx + 1}
          </a>
        </li>
      ))}
    </ol>
  );
}
