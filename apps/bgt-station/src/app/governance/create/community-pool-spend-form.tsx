import { Tooltip } from "@bera/shared-ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@bera/ui/form";
import { Input } from "@bera/ui/input";
import { type UseFormReturn } from "react-hook-form";

export default function CommunityForm({ form }: { form: UseFormReturn }) {
  return (
    <>
      <FormField
        control={form.control}
        name="recipient"
        render={({ field }) => (
          <FormItem className="inline-flex flex-col justify-start gap-2">
            <div className="text-sm font-semibold leading-tight">
              Recipient <Tooltip text="test" />
            </div>
            <div>
              <FormControl>
                <Input
                  type="text"
                  id="forum-discussion-link"
                  placeholder="0x0000...0000"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-2" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="amountA"
        render={({ field }) => (
          <FormItem className="inline-flex flex-col justify-start gap-2">
            <div className="text-sm font-semibold leading-tight">Amount</div>
            <div>
              <Input
                type="number"
                id="forum-discussion-link"
                placeholder="0.0"
                {...field}
              />
              <FormMessage className="mt-2" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="amountB"
        render={({ field }) => (
          <FormItem className="inline-flex flex-col justify-start gap-2">
            <div className="text-sm font-semibold leading-tight">
              Amount <Tooltip text="test" />
            </div>
            <div>
              <Input
                type="number"
                id="forum-discussion-link"
                placeholder="0.0"
                endAdornment="BGT"
                {...field}
              />
              <FormMessage className="mt-2" />
            </div>
          </FormItem>
        )}
      />
    </>
  );
}
