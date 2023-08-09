import { useEffect, useState } from "react";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

export type ParameterChangeLine = {
  subspace: string;
  key: string;
  value: string;
};

export const CustomParameterGroup = ({
  onSubmit,
}: {
  onSubmit: (parameterFrom: ParameterChangeLine[]) => void;
}) => {
  const newLine = { subspace: "", key: "", value: "" };
  const [parameterForm, setParameterForm] = useState<ParameterChangeLine[]>([
    newLine,
  ]);
  useEffect(() => {
    onSubmit(
      parameterForm.filter(
        (param) => !(!param.subspace && !param.key && !param.value),
      ),
    );
  }, [parameterForm]);
  return (
    <div>
      {parameterForm.map((param, index) => (
        <div
          key={`${index}-param-group`}
          className="flex w-full items-center justify-center space-x-2 pb-4"
        >
          <Input
            type="text"
            key={`para-group-${index}-subspace`}
            placeholder="Subspace"
            value={param.subspace}
            onChange={(e) => {
              parameterForm[index]!.subspace = e.target.value;
              setParameterForm([...parameterForm]);
            }}
          />
          <Input
            type="text"
            key={`para-group-${index}-key`}
            placeholder="Key"
            value={param.key}
            onChange={(e) => {
              parameterForm[index]!.key = e.target.value;
              setParameterForm([...parameterForm]);
            }}
          />
          <Input
            type="number"
            key={`para-group-${index}-value`}
            placeholder="Value"
            value={param.value}
            onChange={(e) => {
              parameterForm[index]!.value = e.target.value;
              setParameterForm([...parameterForm]);
            }}
          />
          <div className="border-10 rounded-md border-red-300 bg-muted text-secondary hover:cursor-pointer">
            <Icons.minus
              className="h-7 w-7 rounded-xl text-muted-foreground"
              onClick={() => {
                parameterForm.splice(index, 1);
                setParameterForm([...parameterForm]);
              }}
            />
          </div>
        </div>
      ))}
      <div className="relative h-5 text-xs font-medium leading-tight">
        {/* <span className="text-destructive-foreground">Incomplete fields</span> */}
        <div
          className="absolute right-0 top-0 flex items-center gap-1 text-xs text-muted-foreground hover:cursor-pointer"
          onClick={() => {
            setParameterForm([...parameterForm, newLine]);
          }}
        >
          <Icons.plusCircle className="h-3 w-3 text-muted-foreground" />
          Add Line
        </div>
      </div>
    </div>
  );
};
