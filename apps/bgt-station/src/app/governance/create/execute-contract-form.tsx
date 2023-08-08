import { Tooltip } from "@bera/shared-ui";
import { Input } from "@bera/ui/input";
import { TextArea } from "@bera/ui/text-area";

export default function ExecuteForm() {
  return (
    <div className="flex w-full flex-col justify-start gap-8">
      <div className="inline-flex flex-col justify-start gap-2">
        <div className="text-sm font-semibold leading-tight">
          Run as <Tooltip text="test" />
        </div>
        <Input
          type="text"
          id="forum-discussion-link"
          placeholder="0x0000...0000"
          // value={"forum-discussion-link"}
          // onChange={(e) => {}}
        />
      </div>

      <div className="inline-flex flex-col justify-start gap-2">
        <div className="text-sm font-semibold leading-tight">
          Contract address <Tooltip text="test" />
        </div>
        <Input
          type="text"
          id="forum-discussion-link"
          placeholder="0x0000...0000"
          // value={"forum-discussion-link"}
          // onChange={(e) => {}}
        />
      </div>

      <div className="inline-flex flex-col justify-start gap-2">
        <div className="text-sm font-semibold leading-tight">
          Message <Tooltip text="test" />
        </div>
        <TextArea name="message" id="message" placeholder="{}" />
      </div>

      <div className="inline-flex flex-col justify-start gap-2">
        <div className="text-sm font-semibold leading-tight">
          Amount <Tooltip text="test" />
        </div>
        <Input
          type="number"
          id="forum-discussion-link"
          placeholder="0.0"
          endAdornment="BGT"
          // value={"forum-discussion-link"}
          // onChange={(e) => {}}
        />
      </div>
    </div>
  );
}
