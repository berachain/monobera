function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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
    <ol role="list" className="overflow-hidden">
      {steps.map((item, stepIdx) => (
        <li
          onClick={() => stepIdx < step && setStep(stepIdx)}
          key={stepIdx}
          className={classNames(
            stepIdx !== steps.length - 1 ? "pb-10" : "",
            "relative w-8 cursor-pointer",
          )}
        >
          {stepIdx !== steps.length - 1 ? (
            <div
              className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-primary"
              aria-hidden="true"
            />
          ) : null}
          <a className="group relative flex items-start" aria-current="step">
            <span className="flex h-9 items-center" aria-hidden="true">
              <span
                className={classNames(
                  "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary",
                  step === stepIdx ? "bg-primary" : "bg-background",
                )}
              >
                <span className="">{stepIdx + 1}</span>
              </span>
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}
