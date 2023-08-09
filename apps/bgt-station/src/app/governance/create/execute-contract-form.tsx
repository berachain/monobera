import { usePollBgtBalance } from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { FormField, FormItem, FormMessage } from "@bera/ui/form";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { TextArea } from "@bera/ui/text-area";
import { type UseFormReturn } from "react-hook-form";

export default function ExecuteForm({ form }: { form: UseFormReturn }) {
  const { useBgtBalance } = usePollBgtBalance();
  const userBalance = useBgtBalance();
  return (
    <>
      <FormField
        control={form.control}
        name="runAs"
        render={({ field }) => (
          <FormItem className="inline-flex flex-col justify-start">
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
          <FormItem className="inline-flex flex-col justify-start">
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
          <FormItem className="inline-flex flex-col justify-start">
            <div className="text-sm font-semibold leading-tight">
              Message <Tooltip text="test" />
            </div>
            <TextArea id="proposal-messag" placeholder="{}" {...field} />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem className="relative inline-flex flex-col justify-start">
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
            <div className="absolute right-1 mt-2 flex h-3 w-fit items-center gap-1 text-[10px] text-muted-foreground">
              <Icons.wallet className="relative inline-block h-3 w-3 " />
              {userBalance}
              <span
                className="underline hover:cursor-pointer"
                onClick={() => {
                  form.setValue("amount", userBalance);
                }}
              >
                MAX
              </span>
            </div>
          </FormItem>
        )}
      />
    </>
  );
}
