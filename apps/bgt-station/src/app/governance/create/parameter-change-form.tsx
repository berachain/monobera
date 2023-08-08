import { Tooltip } from "@bera/shared-ui";
import { Input } from "@bera/ui/input";

export default function ParameterForm() {
  return (
    <div className="flex w-full flex-col justify-start gap-8">
      <div className="inline-flex flex-col justify-start gap-2">
        <div className="text-sm font-semibold leading-tight">
          Parameters to change <Tooltip text="test" />
        </div>
        <Input
          type="text"
          id="forum-discussion-link"
          placeholder="Paste link here"
          // value={"forum-discussion-link"}
          // onChange={(e) => {}}
        />
      </div>
    </div>
  );
}
