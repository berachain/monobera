import { Tooltip } from "@bera/shared-ui";
import { FormField, FormItem, FormMessage } from "@bera/ui/form";
import { Input } from "@bera/ui/input";
import { TextArea } from "@bera/ui/text-area";
import { type UseFormReturn } from "react-hook-form";

export default function ExecuteForm({ form }: { form: UseFormReturn }) {
  return (
    <>
      <FormField
        control={form.control}
        name="runAs"
        render={({ field }) => (
          <FormItem className="inline-flex flex-col justify-start gap-2">
            <div className="text-sm font-semibold leading-tight">
              Run as <Tooltip text="test" />
            </div>
            <div>
              <Input
                type="text"
                id="forum-discussion-link"
                placeholder="0x0000...0000"
                {...field}
              />
              <FormMessage className="mt-2" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contractAddress"
        render={({ field }) => (
          <FormItem className="inline-flex flex-col justify-start gap-2">
            <div className="text-sm font-semibold leading-tight">
              Contract address <Tooltip text="test" />
            </div>
            <Input
              type="text"
              id="proposal-contract-address"
              placeholder="0x0000...0000"
              {...field}
            />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem className="inline-flex flex-col justify-start gap-2">
            <div className="text-sm font-semibold leading-tight">
              Message <Tooltip text="test" />
            </div>
            <TextArea
              name="proposal-message"
              id="proposal-messag"
              placeholder="{}"
              {...field}
            />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem className="inline-flex flex-col justify-start gap-2">
            <div className="text-sm font-semibold leading-tight">
              Amount <Tooltip text="test" />
            </div>
            <Input
              type="number"
              id="proposal-execute-amount"
              placeholder="0.0"
              endAdornment="BGT"
              {...field}
            />
          </FormItem>
        )}
      />
    </>
  );
}
